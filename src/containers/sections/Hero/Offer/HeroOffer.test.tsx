import { DisplayTypeValues } from '@config/ConfigsKeys';
import { QueryClientWrapper } from '@config/QueryClient';
// eslint-disable-next-line jest/no-mocks-import
import { renderWithVariantConfig } from '@experiments/__mocks__/MockProviderConfig';
// eslint-disable-next-line jest/no-mocks-import
import AddonsResponse from '@hooks/dazn/offer/__mocks__/AddonsResponse.json';
// eslint-disable-next-line jest/no-mocks-import
import OffersResponseDE from '@hooks/dazn/offer/__mocks__/OffersResponseDE.json';
import { useOffersService } from '@hooks/dazn/offer/shared/UseOfferService';
import { useOffer } from '@hooks/dazn/offer/UseOffer';
import { queryByAttribute } from '@testing-library/react';
import { getCurrency } from '@utils/dazn/Region';

// eslint-disable-next-line jest/no-mocks-import
import { getOfferParsed } from './__mocks__/MockHeroOffer';
import { HeroOffer } from './HeroOffer';
import { HeroOfferFallback } from './HeroOfferFallback';

const currency = 'eur';

jest.mock('@hooks/dazn/offer/UseOffer', () => ({
    ...jest.requireActual('@hooks/dazn/offer/UseOffer'),
    useOffer: jest.fn(),
}));
jest.mock('@hooks/dazn/offer/shared/UseOfferService');
jest.mock('@utils/dazn/Region', () => ({
    ...jest.requireActual('@utils/dazn/Region'),
    getCurrency: jest.fn().mockReturnValue(currency),
}));

const render = renderWithVariantConfig();

describe('Hero Offer', () => {
    const monthly = getOfferParsed(10);

    beforeEach(() => {
        const mockOffersWithAddons = { ...OffersResponseDE, ...AddonsResponse };
        (useOffersService as jest.Mock).mockReturnValue({ data: mockOffersWithAddons });
        (getCurrency as jest.Mock).mockReturnValue(currency);
    });

    it.each`
        displayType                       | testId
        ${DisplayTypeValues.Default}      | ${'HERO_PRICES'}
        ${DisplayTypeValues.Addon}        | ${'HERO_PRICES_ADDONS'}
        ${DisplayTypeValues.CtaOnly}      | ${'HERO_CTA'}
        ${DisplayTypeValues.StartingFrom} | ${'HERO_PRICE'}
        ${DisplayTypeValues.Monthly}      | ${'HERO_PRICES'}
    `(
        `should render the $testId given the display type $displayType`,
        async ({ displayType, testId }) => {
            (useOffer as jest.Mock).mockReturnValue({ monthly, annual: null });
            const { findByTestId } = render(<HeroOffer displayType={displayType} />, {
                wrapper: QueryClientWrapper,
            });

            const prices = await findByTestId(testId);
            expect(prices).toBeInTheDocument();
        },
    );

    it.each`
        displayType               | id
        ${DisplayTypeValues.Copy} | ${'OFFER_COPY_MONTHLY'}
    `(`should render the $id given the display type $displayType`, async ({ displayType, id }) => {
        (useOffer as jest.Mock).mockReturnValue({ monthly, annual: null });
        const { container } = render(<HeroOffer displayType={displayType} />, {
            wrapper: QueryClientWrapper,
        });

        const prices = queryByAttribute('id', container, id);
        expect(prices).not.toBeNull();
    });

    it('should return HeroOfferFallback when there is an error', () => {
        (useOffer as jest.Mock).mockReturnValue({
            monthly,
            annual: null,
            error: 'Error',
        });

        const { container: hero } = render(
            <HeroOffer displayType={DisplayTypeValues.StartingFrom} />,
            {
                wrapper: QueryClientWrapper,
            },
        );

        const { container: heroOfferFallback } = render(<HeroOfferFallback />, {
            wrapper: QueryClientWrapper,
        });

        expect(hero).toStrictEqual(heroOfferFallback);
    });
});
