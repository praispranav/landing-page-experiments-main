import { ResourceStringsKeys } from '@config/ConfigsKeys';
import {
    useLocalisedStringKey,
    useResourceStringKey,
} from '@hooks/resourceStrings/UseLocalisedStrings';
import { FC } from 'react';
import { Periodicity } from 'types/dazn/RatePlans/Offers';

import { HeroSignupCTA } from '../CTA/HeroSignupCTA';

export const HeroOfferFallback: FC = () => {
    const { OfferCTASignUp } = ResourceStringsKeys;
    const ctaSignUp = useLocalisedStringKey(OfferCTASignUp);

    const clickEventPayload = {
        itemId: useResourceStringKey(OfferCTASignUp),
        resourceString: ctaSignUp,
    };

    return (
        <HeroSignupCTA period={Periodicity.Month} clickEventPayload={clickEventPayload}>
            {ctaSignUp}
        </HeroSignupCTA>
    );
};
