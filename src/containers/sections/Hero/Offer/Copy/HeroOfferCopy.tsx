import { headerFontStyles } from '@components/Fonts/Typography.style';
import { ResourceStringsKeys } from '@config/ConfigsKeys';
import { Label } from '@dazn/fe-labels-react';
import { useResourceStringKey } from '@hooks/resourceStrings/UseLocalisedStrings';
import { FC } from 'react';

interface HeroOfferCopyProps {
    annual?: string;
    monthly?: string;
}

export const HeroOfferCopy: FC<HeroOfferCopyProps> = ({ annual = '', monthly = '' }) => {
    const annualMonthlyKey = useResourceStringKey(
        ResourceStringsKeys.HeroOfferCopyMonthlyAnnualPlans
    );

    const monthlyKey = useResourceStringKey(ResourceStringsKeys.HeroOfferCopyMonthlyPlan);

    const annualKey = useResourceStringKey(ResourceStringsKeys.HeroOfferCopyAnnualPlan);

    if (annual && monthly) {
        return (
            <Label id="OFFER_COPY_MONTHLY_ANNUAL" as="p" css={headerFontStyles.header6} stringKey={annualMonthlyKey} variables={{ annual, monthly }} />
        );
    }

    if (monthly) {
        return (
            <Label id="OFFER_COPY_MONTHLY" as="p" css={headerFontStyles.header6} stringKey={monthlyKey} variables={{ monthly }} />
        );
    }

    if (annual) {
        return (
            <Label id="OFFER_COPY_ANNUAL" as="p" css={headerFontStyles.header6} stringKey={annualKey} variables={{ annual }} />
        );
    }

    return null;
};
