import { headerFontStyles } from '@components/Fonts/Typography.style';
import { ResourceStringsKeys } from '@config/ConfigsKeys';
import { useLocalisedStringKey } from '@hooks/resourceStrings/UseLocalisedStrings';
import { FC } from 'react';

interface HeroOfferFreeTrialProps {
    amountMonths: number;
}

export const HeroOfferFreeTrial: FC<HeroOfferFreeTrialProps> = ({ amountMonths }) => {
    const oneMonthFreeTrial = useLocalisedStringKey(
        ResourceStringsKeys.HeroOfferCopyOneMonthFreeTrial,
        { amountMonths },
    );

    const multipleMonthsFreeTrial = useLocalisedStringKey(
        ResourceStringsKeys.HeroOfferCopyMultipleMonthsFreeTrial,
        { amountMonths },
    );

    return amountMonths === 1 ? (
        <p data-testid="OFFER_FREE_TRIAL_MONTH" css={headerFontStyles.header6}>
            {oneMonthFreeTrial}
        </p>
    ) : (
        <p data-testid="OFFER_FREE_TRIAL_MONTHS" css={headerFontStyles.header6}>
            {multipleMonthsFreeTrial}
        </p>
    );
};
