import { formatChargeWithCurrency } from '@hooks/dazn/offer/shared/ChargeTier';
import { Story } from '@storybook/react';
import { getCurrency } from '@utils/dazn/Region';

import { HeroOfferCopy } from '../HeroOfferCopy';

export const Copy: Story = ({ monthlyPrice, annualPrice }) => {
    const currency = getCurrency();

    const monthly = formatChargeWithCurrency({ Currency: currency, Price: monthlyPrice });
    const annual = formatChargeWithCurrency({ Currency: currency, Price: annualPrice });

    return <HeroOfferCopy monthly={monthlyPrice && monthly} annual={annualPrice && annual} />;
};

export default {
    title: 'Sections/Hero/Offer/Copy',
    component: Copy,
    args: { monthlyPrice: 10.99, annualPrice: 100.99 },
};
