import { DisplayTypeValues } from '@config/ConfigsKeys';
import { useAddons } from '@hooks/dazn/offer/UseAddon';
import { getStartingFromOffer, useOffer } from '@hooks/dazn/offer/UseOffer';
import React, { FC, Suspense } from 'react';

import { HeroOfferAddons } from './Addons/HeroOfferAddons';
import { HeroOfferCopy } from './Copy/HeroOfferCopy';
import { HeroOfferCTA } from './CTA/HeroOfferCTA';
import { HeroOfferFallback } from './HeroOfferFallback';
import { HeroOfferMonthlyIPP } from './MonthlyInstalment/HeroOfferMonthlyInstalment';
import { HeroOfferPeriodPlans } from './PeriodPlans/HeroOfferPeriodPlans';
import { HeroOfferStartingFrom } from './StartingFrom/HeroOfferStartingFrom';

interface HeroOfferProps {
    displayType: DisplayTypeValues;
}

const SuspensedHeroOffer: FC<HeroOfferProps> = ({ displayType }) => {
    const { annual, monthly, instalments, error } = useOffer();
    const startingFromOffer = getStartingFromOffer(annual, monthly, instalments);
    const addons = useAddons();

    const freeTrialAmount = monthly?.freeTrialAmount ?? 0;

    if (error || !(annual || monthly)) {
        return <HeroOfferFallback />;
    }

    const displayTypeToComponent = {
        [DisplayTypeValues.CtaOnly]: <HeroOfferCTA freeTrialAmount={freeTrialAmount} />,
        [DisplayTypeValues.Copy]: (
            <>
                <HeroOfferCopy annual={annual?.price} monthly={monthly?.price} />
                <HeroOfferCTA freeTrialAmount={freeTrialAmount} />
            </>
        ),
        [DisplayTypeValues.StartingFrom]: startingFromOffer ? (
            <HeroOfferStartingFrom offer={startingFromOffer} />
        ) : null,
        [DisplayTypeValues.Default]: <HeroOfferPeriodPlans monthly={monthly} annual={annual} />,
        [DisplayTypeValues.Monthly]: <HeroOfferPeriodPlans monthly={monthly} annual={null} />,
        [DisplayTypeValues.Addon]: <HeroOfferAddons monthly={monthly} addonPrice={addons.value} />,
        [DisplayTypeValues.MonthlyInstalments]: (
            <HeroOfferMonthlyIPP monthly={monthly} instalments={instalments} />
        ),
    };

    return displayTypeToComponent[displayType] ?? displayTypeToComponent[DisplayTypeValues.Default];
};

export const HeroOffer: FC<HeroOfferProps> = ({ displayType }) => (
    <Suspense fallback={null}>
        <SuspensedHeroOffer displayType={displayType} />
    </Suspense>
);
