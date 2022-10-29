import { ResourceStringsKeys } from '@config/ConfigsKeys';
import { Label } from '@dazn/fe-labels-react';
import { useSignupKey } from '@hooks/resourceStrings/signup/UseSignupKey';
import { useResourceStringKey } from '@hooks/resourceStrings/UseLocalisedStrings';
import { useLabelKey } from '@labels/labels';
import { FC } from 'react';

import { HeroSignupCTA } from '../../CTA/HeroSignupCTA';
import { HeroPriceContext, usePricePeriod, usePriceType } from './HeroPrice.hooks';
import {
    priceContainerStyle,
    priceLabelStyle,
    priceValueStyle,
    signupStyle,
} from './HeroPrice.style';
import { HeroPriceProps, HeroPriceTypesEnum } from './types';

interface HeroPriceComposite {
    Value: typeof HeroPriceValue;
    Label: typeof HeroPriceLabel;
    Cta: typeof HeroPriceCta;
}

const HeroPriceCta: FC<{ selectPlan?: boolean }> = ({ selectPlan }) => {
    const ctaKey = useSignupKey({
        ctaFreeTrialKey: ResourceStringsKeys.OfferCTAFreeTrial,
        ctaGetStarted: ResourceStringsKeys.OfferCTAGetStarted,
        ctaSignUpKey: ResourceStringsKeys.OfferCTASignUp,
    });

    const ctaSignUpKey = useResourceStringKey(ctaKey);
    const ctaSignUpCopy = useLabelKey({ stringKey: ctaSignUpKey });

    const clickEventPayload = {
        itemId: ctaSignUpKey,
        resourceString: ctaSignUpCopy,
    };

    const period = usePricePeriod();

    return (
        <HeroSignupCTA
            period={selectPlan ? null : period}
            css={signupStyle}
            clickEventPayload={clickEventPayload}
        >
            <Label stringKey={ctaSignUpKey} />
        </HeroSignupCTA>
    );
};

export const HeroPriceLabel: FC = () => {
    const period = usePricePeriod();
    const type = usePriceType();

    const pricePeriodLabelName =
        `HeroOfferCopyPriceLabel${period}` as keyof typeof ResourceStringsKeys;

    const priceLabels = {
        [HeroPriceTypesEnum.Period]: ResourceStringsKeys[pricePeriodLabelName],
        [HeroPriceTypesEnum.Addon]: ResourceStringsKeys.HeroOfferCopyPriceLabelAddon,
        [HeroPriceTypesEnum.StartingFrom]: ResourceStringsKeys.HeroOfferCopyPriceLabelStartingFrom,
    };

    const priceKey = useResourceStringKey(priceLabels[type]);

    const priceCopy = useLabelKey({ stringKey: priceKey });
    if (priceKey === priceCopy) {
        return null
    }
    return <Label id="HERO_PRICE_LABEL" css={priceLabelStyle} stringKey={priceKey} />;
};

const HeroPriceValue: FC = ({ children }) => (
    <span data-testid="HERO_PRICE_FULL_VALUE" css={priceValueStyle}>
        {children}
    </span>
);

export const HeroPrice: FC<HeroPriceProps> & HeroPriceComposite = ({ children, ...props }) => {
    const priceTestId =
        props.type === HeroPriceTypesEnum.Period
            ? `HERO_PRICE_${props.period.toUpperCase()}`
            : 'HERO_PRICE';

    return (
        <HeroPriceContext.Provider value={props}>
            <div css={priceContainerStyle} data-testid={priceTestId}>
                {children}
            </div>
        </HeroPriceContext.Provider>
    );
};

HeroPrice.Value = HeroPriceValue;
HeroPrice.Label = HeroPriceLabel;
HeroPrice.Cta = HeroPriceCta;
