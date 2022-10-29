import { queryClient, QueryClientWrapper } from '@config/QueryClient';
// eslint-disable-next-line jest/no-mocks-import
import { mockNextUpRails } from '@hooks/dazn/rail/__mocks__/MocksUseRail';
import { useRail } from '@hooks/dazn/rail/UseRail';
import { renderHook, RenderHookResult } from '@testing-library/react-hooks';
import { getLanguage } from '@utils/dazn/Region';
import { RailResponse } from 'types/dazn/Rail/Rail';

// eslint-disable-next-line jest/no-mocks-import
import { getNextUpFightTilesMock } from './__mocks__/NextUpMocks';
import { useNextUpTiles } from './NextUp.hooks';

jest.mock('@hooks/dazn/rail/UseRail');
jest.mock('@utils/dazn/Region');

const railId = 'mockedRailId'

const renderFightTiles = (): RenderHookResult<
    Record<string, never>,
    ReturnType<typeof useNextUpTiles>
> => renderHook(() => useNextUpTiles(railId), { wrapper: QueryClientWrapper });

const getMockMixedNextUp = async (): Promise<RailResponse> => {
    const comingUpEnglish = await mockNextUpRails.getEnglish();
    const comingUpSpanish = await mockNextUpRails.getSpanish();

    return { ...comingUpEnglish, Tiles: [...comingUpEnglish.Tiles, ...comingUpSpanish.Tiles] };
};

describe('useNextUpTiles', () => {
    beforeEach(() => queryClient.clear());

    test('should call the rail with NextUp as being the ID', async () => {
        const mockNextUpRail = await mockNextUpRails.getEnglish();
        (useRail as jest.Mock).mockReturnValue(mockNextUpRail);

        const { result, waitFor } = renderFightTiles();
        await waitFor(() => result.current.length > 0);

        expect(useRail as jest.Mock).toHaveBeenCalledWith({
            id: railId,
            params: {
                ContentType: 'None',
                PageType: 'Home',
            },
        });
    });

    test('should map the rail tiles into the format consumed by the fight tiles', async () => {
        const mockNextUpRail = await mockNextUpRails.getEnglish();
        (useRail as jest.Mock).mockReturnValue(mockNextUpRail);

        const { result, waitFor } = renderFightTiles();
        await waitFor(() => result.current.length > 0);

        const expectedFightTiles = await getNextUpFightTilesMock();
        expect(result.current).toStrictEqual(expectedFightTiles);
    });

    test.each`
        language | titleSuffix
        ${'en'}  | ${'Fight Night'}
        ${'es'}  | ${'Noche de Pelea'}
    `(
        `should filter the rail for $language tiles that contain "$titleSuffix" in the tile`,
        async ({ titleSuffix, language }) => {
            const mockComingUpRail = await getMockMixedNextUp();

            (getLanguage as jest.Mock).mockReturnValue(language);
            (useRail as jest.Mock).mockReturnValue(mockComingUpRail);

            const { result, waitFor } = renderFightTiles();
            await waitFor(() => result.current.length > 0);

            expect(result.current.every(({ title }) => title.includes(titleSuffix))).toBeTruthy();
            expect(result.current.length).toBeGreaterThan(1);
        },
    );
});
