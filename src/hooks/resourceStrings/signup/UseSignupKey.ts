import { ResourceStringsKeys } from '@config/ConfigsKeys';
import { useShouldDisplayPPV } from '@hooks/dazn/offer/UseAddon';
import { useOffer } from '@hooks/dazn/offer/UseOffer';

import { UseSignupKey } from './types';

export const useSignupKey = ({
    ctaFreeTrialKey,
    ctaGetStarted,
    ctaSignUpKey,
}: UseSignupKey): ResourceStringsKeys => {
    const { monthly } = useOffer();

    const shouldDisplayPPV = useShouldDisplayPPV();
    const freeTrial = monthly?.freeTrialAmount ?? 0;

    if (shouldDisplayPPV && ctaGetStarted) {
        return ctaGetStarted;
    }

    if (freeTrial > 0) {
        return ctaFreeTrialKey;
    }

    return ctaSignUpKey;
};
