import { ResourceStringsKeys } from '@config/ConfigsKeys';
// eslint-disable-next-line jest/no-mocks-import
import { getOfferParsed } from '@containers/sections/Hero/Offer/__mocks__/MockHeroOffer';
import { AnnualOfferParsed } from '@hooks/dazn/offer/types';
import { useShouldDisplayPPV } from '@hooks/dazn/offer/UseAddon';
import { useOffer } from '@hooks/dazn/offer/UseOffer';
import { renderHook } from '@testing-library/react-hooks';

import { useSignupKey } from './UseSignupKey';

jest.mock('@hooks/dazn/offer/UseOffer');
jest.mock('@hooks/dazn/offer/UseAddon');

jest.unmock('./UseSignupKey');

describe('Use Signup Copy', () => {
    beforeEach(() => {
        (useShouldDisplayPPV as jest.Mock).mockReturnValue(false);
    });

    const renderSignupHook = (): string => {
        const { result } = renderHook(() =>
            useSignupKey({
                ctaFreeTrialKey: ResourceStringsKeys.OfferCTAFreeTrial,
                ctaGetStarted: ResourceStringsKeys.OfferCTAGetStarted,
                ctaSignUpKey: ResourceStringsKeys.OfferCTASignUp,
            }),
        );

        return result.current;
    };

    it('should have a CTA with the text set to "Get Started" when addon exists', async () => {
        const monthly = getOfferParsed(1.99, { freeTrialAmount: 1 });
        (useOffer as jest.Mock).mockReturnValue({ monthly });

        (useShouldDisplayPPV as jest.Mock).mockReturnValue(true);

        const copy = renderSignupHook();
        expect(copy).toBe(ResourceStringsKeys.OfferCTAGetStarted);
    });

    it('should have a CTA with the text set to "SIGN UP NOW" when offer is "Annual"', async () => {
        const monthly = getOfferParsed(1.99);
        const annual = getOfferParsed(10, { amountSaved: null }) as AnnualOfferParsed;

        (useOffer as jest.Mock).mockReturnValue({ annual, monthly });
        const copy = renderSignupHook();

        expect(copy).toBe(ResourceStringsKeys.OfferCTASignUp);
    });

    it('should have a CTA with the text set to "Start your free month" when there is a free trial', async () => {
        const monthly = getOfferParsed(1.99, { freeTrialAmount: 1 });
        (useOffer as jest.Mock).mockReturnValue({ monthly });

        const copy = renderSignupHook();

        expect(copy).toBe(ResourceStringsKeys.OfferCTAFreeTrial);
    });

    it('should have a CTA with the text set to "SIGN UP NOW" when the are two price plans and no free trial', async () => {
        const monthly = getOfferParsed(1.99);
        const annual = getOfferParsed(1.99, { amountSaved: null }) as AnnualOfferParsed;

        (useOffer as jest.Mock).mockReturnValue({ monthly, annual });
        const copy = renderSignupHook();

        expect(copy).toBe(ResourceStringsKeys.OfferCTASignUp);
    });

    it('should have a CTA with the text set to "SIGN UP NOW" when there is annual plan and no free trial', async () => {
        const annual = getOfferParsed(1.99, { amountSaved: null }) as AnnualOfferParsed;

        (useOffer as jest.Mock).mockReturnValue({ annual });
        const copy = renderSignupHook();

        expect(copy).toBe(ResourceStringsKeys.OfferCTASignUp);
    });
});
