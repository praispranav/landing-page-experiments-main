import { QueryClientWrapper } from '@config/QueryClient';
import { IScheduleTile } from '@dazn/discovery-web-module-components/dist/ScheduleGrid';
import { renderHook } from '@testing-library/react-hooks';
import format from 'date-fns/format';
import { RailTile } from 'types/dazn/Rail/Rail';

import { getTileImage, getTileMetadata } from '../shared/Tile';
import { useService } from '../UseService';
// eslint-disable-next-line jest/no-mocks-import
import MockEpg from './__mocks__/MockEpg.json';
import { useEpg } from './UseEpg';

jest.mock('../UseService');

describe('UseEpg', () => {
    const getMockTiles = async (epgRailTiles: RailTile[]): Promise<IScheduleTile[]> => {
        const mapRailToSchedule = async (tile: RailTile): Promise<IScheduleTile> => ({
            id: tile.Id,
            eventId: tile.EventId,
            title: tile.Title,
            labels: undefined,
            subtitle: await getTileMetadata(tile as RailTile),
            imageUrl: getTileImage({
                imageId: tile.Image.Id,
                width: 334,
                height: 187,
            }),
        });

        return Promise.all(epgRailTiles.map(mapRailToSchedule));
    };

    describe('Hook', () => {
        const hookOptions = { wrapper: QueryClientWrapper };
        const currentDate = format(Date.now(), 'YYYY-MM-DD');

        beforeEach(() => {
            (useService as jest.Mock).mockReset();
        });

        it('should return the schedule tiles', async () => {
            (useService as jest.Mock).mockReturnValue({ data: MockEpg });
            const { result, waitForValueToChange } = renderHook(
                () => useEpg(currentDate, []),
                hookOptions,
            );

            await waitForValueToChange(() => result.current);
            expect(result.current).toStrictEqual(await getMockTiles(MockEpg.Tiles as RailTile[]));
        });

        it('should return the schedule tiles filtered by sports', async () => {
            const expectedSport = 'Darts';
            const expectedTiles = MockEpg.Tiles.filter(
                (tile) => tile.Sport.Title === expectedSport,
            );

            (useService as jest.Mock).mockReturnValue({
                data: { ...MockEpg, Tiles: expectedTiles },
            });

            const { result, waitForValueToChange } = renderHook(
                () => useEpg(currentDate, [expectedSport]),
                hookOptions,
            );

            await waitForValueToChange(() => result.current);
            expect(result.current).toStrictEqual(await getMockTiles(expectedTiles as RailTile[]));
        });
    });
});
