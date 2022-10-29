// eslint-disable-next-line jest/no-mocks-import
import { renderWithVariantConfig } from '@experiments/__mocks__/MockProviderConfig';
import { AnnualOfferParsed } from '@hooks/dazn/offer/types';

// eslint-disable-next-line jest/no-mocks-import
import { getOfferParsed } from '../__mocks__/MockHeroOffer';
import { HeroOfferStartingFrom } from './HeroOfferStartingFrom';

jest.mock('@hooks/dazn/offer/UseOffer');
jest.mock('@hooks/dazn/offer/UseAddon');

import { useAddons } from '@hooks/dazn/offer/UseAddon';
import { useOffer } from '@hooks/dazn/offer/UseOffer';

const render = renderWithVariantConfig();

describe('HeroOfferStartingFrom', () => {
    beforeEach(() => (useAddons as jest.Mock).mockReturnValue({ length: 0 }));

    const instalments = getOfferParsed(24.99);
    const monthly = getOfferParsed(29.99);
    const annual = getOfferParsed(274.99) as AnnualOfferParsed;

    it('should display the lowest monthly price', () => {
        (useOffer as jest.Mock).mockReturnValue({ monthly, annual });
        const { queryByTestId } = render(<HeroOfferStartingFrom offer={instalments} />);

        expect(queryByTestId('HERO_PRICE')).toHaveTextContent(instalments?.price as string);
        expect(queryByTestId('HERO_PRICE')).not.toHaveTextContent(monthly?.price as string);
        expect(queryByTestId('HERO_PRICE')).not.toHaveTextContent(annual?.price as string);
    });
});
