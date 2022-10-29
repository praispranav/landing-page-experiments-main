/* eslint-disable jest/no-mocks-import */
import { QueryClientWrapper } from '@config/QueryClient';
import { useEpg } from '@hooks/dazn/epg/UseEpg';
import { render } from '@testing-library/react';
import { mockServicePath } from '@utils/dazn/__mocks__/MockService';
import { internet } from 'faker';

import { useEpgDates, useSportsRail } from './Epg.hooks';
import { ScheduleTiles, ScheduleTilesFallback } from './ScheduleTiles';

const mockedEvents = [
    {
        id: 'Epg:16sjxlztmhho11223c22dvsegh',
        eventId: 'p9gvtvfwvum525bk53mg3sy0',
        title: 'NFL Network',
        subtitle: 'NFL',
        imageUrl:
            'https://image.discovery.dazn-test.com/eu/v2/eu/image/?id=124607045169_image-header_pDach_1592246667000&quality=85&width=334&height=187&resizeAction=fill&verticalAlignment=top&format=jpg',
        labels: ['LIVE'],
    },
    {
        id: 'Epg:tmn6kyknw3xk10p6rthsro4lb',
        eventId: 'b8vjb4nr3810y912b4n0afc7c',
        title: 'MLB Network',
        subtitle: 'MLB Network',
        imageUrl:
            'https://image.discovery.dazn-test.com/eu/v2/eu/image/?id=178325573004_image-header_pDach_1617010980000&quality=85&width=334&height=187&resizeAction=fill&verticalAlignment=top&format=jpg',
        labels: ['LIVE'],
    },
];

jest.mock('@hooks/dazn/epg/UseEpg').mock('./Epg.hooks');

describe('ScheduleTiles', () => {
    beforeEach(() => {
        (useEpgDates as jest.Mock).mockReturnValue({
            '2020-01-10': true,
            '2020-02-10': true,
            '2020-03-10': true,
        });

        mockServicePath(internet.url());
    });
    test('should render Schedule with available events', () => {
        (useEpg as jest.Mock).mockReturnValueOnce(mockedEvents);
        const { container } = render(
            <ScheduleTiles selectedDate="2020-02-10" selectedSportsMap={{}} />,
            { wrapper: QueryClientWrapper },
        );

        const tiles = container.querySelectorAll('[data-test-id="TILE_TITLE"]');
        const noEventsMessage = container.querySelector('[data-test-id="GRID_MESSAGE"]');

        expect(noEventsMessage).not.toBeInTheDocument();
        expect(tiles).toHaveLength(2);
    });

    test('should render Schedule with no events and with empty events message', () => {
        (useEpg as jest.Mock).mockReturnValueOnce([]);
        (useSportsRail as jest.Mock).mockReturnValueOnce([]);

        const { container } = render(
            <ScheduleTiles selectedDate="2020-02-10" selectedSportsMap={{}} />,
            { wrapper: QueryClientWrapper },
        );

        const tiles = container.querySelectorAll('[data-test-id="TILE_TITLE"]');
        const noEventsMessage = container.querySelector('[data-test-id="GRID_MESSAGE"]');

        expect(noEventsMessage).toBeInTheDocument();
        expect(tiles).toHaveLength(0);
    });

    test('should render ScheduleTilesLoading with spinner and no events and no empty events message', () => {
        (useEpg as jest.Mock).mockReturnValueOnce([]);
        (useSportsRail as jest.Mock).mockReturnValueOnce([]);

        const { container } = render(<ScheduleTilesFallback />);

        const spinner = container.querySelector('[class^="spinner"]');
        const tiles = container.querySelectorAll('[data-test-id="TILE_TITLE"]');
        const noEventsMessage = container.querySelector('[data-test-id="GRID_MESSAGE"]');

        expect(spinner).toBeInTheDocument();
        expect(noEventsMessage).not.toBeInTheDocument();
        expect(tiles).toHaveLength(0);
    });

    test('should render ScheduleTilesLoading with no spinner and no events and no empty events message', () => {
        (useEpg as jest.Mock).mockReturnValueOnce([]);
        (useSportsRail as jest.Mock).mockReturnValueOnce([]);

        const { container } = render(<ScheduleTilesFallback isLoading={false} />);

        const spinner = container.querySelector('[class^="spinner"]');
        const tiles = container.querySelectorAll('[data-test-id="TILE_TITLE"]');
        const noEventsMessage = container.querySelector('[data-test-id="GRID_MESSAGE"]');

        expect(spinner).not.toBeInTheDocument();
        expect(noEventsMessage).toBeInTheDocument();
        expect(tiles).toHaveLength(0);
    });
});
