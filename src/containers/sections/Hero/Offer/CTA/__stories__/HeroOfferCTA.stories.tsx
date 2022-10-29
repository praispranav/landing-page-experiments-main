import { Story } from '@storybook/react';

import { HeroOfferCTA } from '../HeroOfferCTA';

export const CTA: Story = ({ hasFreeTrial }) => (
    <HeroOfferCTA freeTrialAmount={Number(hasFreeTrial)} />
);

export default {
    title: 'Sections/Hero/Offer/CTA',
    component: CTA,
    args: { hasFreeTrial: false },
};
