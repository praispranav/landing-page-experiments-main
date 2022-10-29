import { formatChargeWithCurrency } from '@hooks/dazn/offer/shared/ChargeTier';
import { Story } from '@storybook/react';
import { formatWithCurrency } from '@utils/Currency';
import { getCurrency } from '@utils/dazn/Region';

import { HeroOfferMonthlyIPP } from '../HeroOfferMonthlyInstalment';

export const MonthlyInstalment: Story = ({ monthlyPrice, Instalment }) => {
    const currency = getCurrency();
    const yearValueSaved = 12 * (monthlyPrice - Instalment);
    const amountSaved = {
        total: formatWithCurrency(yearValueSaved, currency),
        monthly: formatWithCurrency(yearValueSaved / 12, currency),
    };

    const offer = {
        monthly: {
            freeTrialAmount: 0,
            price: formatChargeWithCurrency({ Currency: currency, Price: monthlyPrice }),
        },
        Instalment: {
            freeTrialAmount: 0,
            amountSaved: monthlyPrice && amountSaved,
            price: formatChargeWithCurrency({ Currency: currency, Price: Instalment }),
        },
    };

    return <HeroOfferMonthlyIPP monthly={offer.monthly} instalments={offer.Instalment} />;
};

export default {
    title: 'Sections/Hero/Offer/Monthly Instalment',
};
