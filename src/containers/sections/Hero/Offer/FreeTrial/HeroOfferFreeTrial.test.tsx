// eslint-disable-next-line jest/no-mocks-import
import { renderWithVariantConfig } from '@experiments/__mocks__/MockProviderConfig';

import { HeroOfferFreeTrial } from './HeroOfferFreeTrial';

const render = renderWithVariantConfig();

describe('HeroOfferFreeTrial', () => {
    it('should render copy for one month of free trial when the amount of months is 1', () => {
        const { queryByTestId } = render(<HeroOfferFreeTrial amountMonths={1} />);

        expect(queryByTestId('OFFER_FREE_TRIAL_MONTH')).toHaveTextContent(
            'Try free for 1 month. Cancel at anytime.',
        );
    });

    it('should render copy for three month of free trial when the amount of months is 3', () => {
        const { queryByTestId } = render(<HeroOfferFreeTrial amountMonths={3} />);

        expect(queryByTestId('OFFER_FREE_TRIAL_MONTHS')).toHaveTextContent(
            'Try free for 3 months. Cancel at anytime.',
        );
    });
});
