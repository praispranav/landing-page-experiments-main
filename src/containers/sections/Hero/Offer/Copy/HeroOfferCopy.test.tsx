// eslint-disable-next-line jest/no-mocks-import
import { renderWithVariantConfig } from '@experiments/__mocks__/MockProviderConfig';
import { AnnualOfferParsed } from '@hooks/dazn/offer/types';
import { queryByAttribute } from '@testing-library/react';

// eslint-disable-next-line jest/no-mocks-import
import { getOfferParsed } from '../__mocks__/MockHeroOffer';
import { HeroOfferCopy } from './HeroOfferCopy';

const render = renderWithVariantConfig();

describe('HeroOfferCopy', () => {
    it("shouldn't show any copy while monthly or annual hasn't been passed", () => {
        const { container } = render(<HeroOfferCopy />);

        expect(queryByAttribute("id", container, 'OFFER_COPY_ANNUAL')).toBeNull();
        expect(queryByAttribute("id", container, 'OFFER_COPY_MONTHLY')).toBeNull();
    });

    describe('Regular', () => {
        const monthly = getOfferParsed(1);
        const annual = getOfferParsed(10, { amountSaved: null }) as AnnualOfferParsed;

        it('should show the price inside the monthly copy', () => {
            const { container } = render(<HeroOfferCopy monthly={monthly.price} />);

            expect(queryByAttribute("id", container, 'OFFER_COPY_MONTHLY')).toHaveTextContent(
                '€1.00 per month. Cancel anytime.',
            );
        });

        it('should show the price inside the annual copy', () => {
            const { container } = render(<HeroOfferCopy annual={annual.price} />);

            expect(queryByAttribute("id", container, 'OFFER_COPY_ANNUAL')).toHaveTextContent('€10.00 per year.');
        });

        it('should show the price for the monthly & annual copy', () => {
            const { container } = render(
                <HeroOfferCopy monthly={monthly.price} annual={annual.price} />,
            );

            expect(queryByAttribute("id", container, 'OFFER_COPY_MONTHLY_ANNUAL')).toHaveTextContent(
                '€1.00 per month (cancel anytime) or €10.00 per year.',
            );
        });
    });
});
