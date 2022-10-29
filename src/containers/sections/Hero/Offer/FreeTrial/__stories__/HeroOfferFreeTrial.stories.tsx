import { Story } from '@storybook/react';

import { HeroOfferFreeTrial } from '../HeroOfferFreeTrial';

export const FreeTrial: Story = ({ amountMonths }) => (
    <HeroOfferFreeTrial amountMonths={amountMonths} />
);

export default {
    title: 'Sections/Hero/Offer/Free Trial',
    component: FreeTrial,
    args: { amountMonths: 0 },
};
