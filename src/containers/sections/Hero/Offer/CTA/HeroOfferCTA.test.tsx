// eslint-disable-next-line jest/no-mocks-import
import { renderWithVariantConfig } from '@experiments/__mocks__/MockProviderConfig';
import { queryByAttribute } from '@testing-library/react';

import { HeroOfferCTA } from './HeroOfferCTA';

const render = renderWithVariantConfig();

describe('HeroOfferCTA', () => {
    it('should render the Hero Offer only with the CTA, without any price or copy', () => {
        const { container } = render(<HeroOfferCTA freeTrialAmount={0} />);

        expect(queryByAttribute("id", container, 'HERO_CTA')).toHaveTextContent('SIGN UP NOW');
    });

    it('should render the Hero Offer free trial', () => {
        const { container } = render(<HeroOfferCTA freeTrialAmount={1} />);

        expect(queryByAttribute("id", container, 'HERO_CTA')).toHaveTextContent('Start your free month');
    });
});
