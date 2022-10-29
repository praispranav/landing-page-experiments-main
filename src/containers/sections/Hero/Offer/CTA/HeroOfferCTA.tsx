import { ResourceStringsKeys } from '@config/ConfigsKeys';
import { Label } from '@dazn/fe-labels-react';
import { useResourceStringKey } from '@hooks/resourceStrings/UseLocalisedStrings';
import { useLabelKey } from '@labels/labels';
import React, { FC } from 'react';
import { Periodicity } from 'types/dazn/RatePlans/Offers';

import { HeroSignupCTA } from '../../CTA/HeroSignupCTA';

export const HeroOfferCTA: FC<{ freeTrialAmount: number }> = ({ freeTrialAmount }) => {
    const ctaKey = freeTrialAmount
        ? ResourceStringsKeys.OfferCTAFreeTrial
        : ResourceStringsKeys.OfferCTASignUp;
    const ctaSignUpkey = useResourceStringKey(ctaKey);
    const ctaSignUpCopy = useLabelKey({ stringKey: ctaSignUpkey });

    const clickEventPayload = {
        itemId: ctaSignUpkey,
        resourceString: ctaSignUpCopy,
    };

    return (
        <HeroSignupCTA period={Periodicity.Month} clickEventPayload={clickEventPayload}>
            <Label id="HERO_CTA" stringKey={ctaSignUpkey} />
        </HeroSignupCTA>
    );
};
