import { useDefaultLogoSet } from '@hooks/dazn/spolo/UseSpolo';
import { render } from '@testing-library/react';

import { SportsGrid } from './SportsGrid';

const sportsLogoListMock = [
    {
        id: '6by3h89i2eykc341oz7lv1ddd',
        name: 'Bundesliga',
        url: 'https://image.discovery.indazn.com/eu/v4/eu/none/83010117235_image-tile_pDach_1646908777000/fill/center/top/none/100/200/200/png/image',
    },
    {
        id: '4oogyu6o156iphvdvphwpck10',
        name: 'UEFA Champions League',
        url: 'https://image.discovery.indazn.com/eu/v4/eu/none/123728965472_image-tile_pDach_1624887384000/fill/center/top/none/100/200/200/png/image',
    },
];

jest.mock('@hooks/dazn/spolo/UseSpolo');
jest.mock('@hooks/utils/UseLocalisedConfig');

describe('Sports Grid', () => {
    it('should render the localised logos as a list of logos', () => {
        (useDefaultLogoSet as jest.Mock).mockReturnValue(sportsLogoListMock);
        const { getAllByTestId } = render(<SportsGrid />);

        const logos = getAllByTestId('SPORTS_LOGO');

        expect(logos.length).toBe(sportsLogoListMock.length);
    });

    it('should not render any logo in case nothing has been returned', () => {
        (useDefaultLogoSet as jest.Mock).mockReturnValue([]);
        const { queryByTestId } = render(<SportsGrid />);

        expect(queryByTestId('SPORTS_GRID')).not.toBeInTheDocument();
    });

    it('Should render the fallback div in case of error', () => {
        (useDefaultLogoSet as jest.Mock).mockImplementation(() => {
            throw new Error('Spolo Fallback Test');
        });

        const { queryByTestId } = render(<SportsGrid />);

        expect(queryByTestId('SPORTS_GRID')).not.toBeInTheDocument();
        expect(queryByTestId('SPORTS_GRID_FALLBACK')).toBeInTheDocument();
    });
});
