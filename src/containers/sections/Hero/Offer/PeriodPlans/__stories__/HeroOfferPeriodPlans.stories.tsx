import { formatChargeWithCurrency } from '@hooks/dazn/offer/shared/ChargeTier';
import { AnnualOfferParsed, MonthlyOfferParsed } from '@hooks/dazn/offer/types';
import { Story } from '@storybook/react';
import { useXhrMocks } from '@utils/__mocks__/UseXhrMocks';
import { formatWithCurrency } from '@utils/Currency';
import { getCurrency } from '@utils/dazn/Region';
import { FC, Suspense } from 'react';

import { locale as localeControl } from '../../__stories__/Controls';
import { mockOffersByLocale } from '../../__stories__/MockedResponse';
import { HeroOfferPeriodPlans, HeroOfferPeriodPlansProps } from '../HeroOfferPeriodPlans';

const HeroOfferPeriodPlansType: FC<HeroOfferPeriodPlansProps> = ({ monthly, annual }) => (
    <Suspense fallback={null}>
        <HeroOfferPeriodPlans monthly={monthly} annual={annual} />
    </Suspense>
);

const Template: Story = ({ monthlyPrice, annualPrice, hasFreeTrial, locale }) => {
    useXhrMocks([mockOffersByLocale(locale)]);

    const currency = getCurrency();

    const freeTrialAmount = hasFreeTrial ? 1 : 0;
    const monthlyValueSaved = monthlyPrice * 12 - annualPrice;
    const amountSaved = {
        total: formatWithCurrency(monthlyValueSaved, currency),
        monthly: formatWithCurrency(annualPrice / 12, currency),
        percentageSave: monthlyValueSaved,
    };

    const annual: AnnualOfferParsed = {
        freeTrialAmount,
        price: formatChargeWithCurrency({ Currency: currency, Price: annualPrice }),
        amountSaved: monthlyPrice && amountSaved,
    };

    const monthly: MonthlyOfferParsed = {
        freeTrialAmount,
        price: formatChargeWithCurrency({ Currency: currency, Price: monthlyPrice }),
    };

    return (
        <HeroOfferPeriodPlansType
            monthly={monthlyPrice && monthly}
            annual={annualPrice && annual}
        />
    );
};

export default {
    title: 'Sections/Hero/Offer/Period Plans',
    argTypes: { locale: localeControl },
    args: { locale: 'de-DE' },
};

export const OnlyMonthly = Template.bind({});
OnlyMonthly.args = { monthlyPrice: 10.99 };

export const OnlyAnnual = Template.bind({});
OnlyAnnual.args = { annualPrice: 100.99 };

export const MonthlyAndAnnual = Template.bind({});
MonthlyAndAnnual.args = { monthlyPrice: 10.99, annualPrice: 100.99 };
