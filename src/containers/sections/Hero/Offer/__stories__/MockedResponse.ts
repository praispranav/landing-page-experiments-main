/* eslint-disable jest/no-mocks-import */
import { queryClient } from '@config/QueryClient';
import AddonsResponse from '@hooks/dazn/offer/__mocks__/AddonsResponse.json';
import OfferResponseAT from '@hooks/dazn/offer/__mocks__/OffersResponseAT.json';
import OfferResponseBR from '@hooks/dazn/offer/__mocks__/OffersResponseBR.json';
import OfferResponseCA from '@hooks/dazn/offer/__mocks__/OffersResponseCA.json';
import OfferResponseCH from '@hooks/dazn/offer/__mocks__/OffersResponseCH.json';
import OfferResponseDE from '@hooks/dazn/offer/__mocks__/OffersResponseDE.json';
import OfferResponseES from '@hooks/dazn/offer/__mocks__/OffersResponseES.json';
import OfferResponseIE from '@hooks/dazn/offer/__mocks__/OffersResponseIE.json';
import OfferResponseIT from '@hooks/dazn/offer/__mocks__/OffersResponseIT.json';
import OfferResponseJP from '@hooks/dazn/offer/__mocks__/OffersResponseJP.json';
import OfferResponseMOON from '@hooks/dazn/offer/__mocks__/OffersResponseMOON.json';
import OfferResponseUS from '@hooks/dazn/offer/__mocks__/OffersResponseUS.json';
import { IMock } from '@utils/__mocks__/UseXhrMocks';
import { LocaleKeys } from '@utils/dazn/__mocks__/constants';
import { mockCurrency, mockLocale } from '@utils/dazn/__mocks__/MockRegion';
import { getCountry } from '@utils/dazn/Region';
import { Addon, OffersResponse } from 'types/dazn/RatePlans/Offers';

export const mockResponseMap: Record<LocaleKeys, Omit<OffersResponse, 'Addons'>> = {
    'de-DE': OfferResponseDE,
    'en-CA': OfferResponseCA,
    'en-US': OfferResponseUS,
    'ja-JP': OfferResponseJP,
    'pt-BR': OfferResponseBR,
    'en-CH': OfferResponseCH,
    'de-AT': OfferResponseAT,
    'it-IT': OfferResponseIT,
    'es-ES': OfferResponseES,

    // Moon
    'ru-RU': OfferResponseMOON,
    'nl-NL': OfferResponseMOON,
    'en-GB': OfferResponseMOON,
    'en-IE': OfferResponseIE,
    'en-AU': OfferResponseMOON,
    'en-NZ': OfferResponseMOON,
};

const defaultOffersResponse: OffersResponse = {
    Offers: [],
    Addons: [],
    GiftCode: null,
    NoOfferFreeTrialMonths: 0,
    // eslint-disable-next-line id-length
    FreeTrialIneligibilityReason: null,
    PaymentMethods: OfferResponseDE.PaymentMethods,
};

const removeOfferQuery = (country: string): void => {
    queryClient.removeQueries(`tiered-pricing-offer-${country}`);
};

export const mockOffersRequest = (
    mockedResponse: Partial<OffersResponse>,
    removeQuery?: boolean,
): IMock => {
    if (removeQuery) {
        removeOfferQuery(getCountry());
    }

    return {
        method: 'POST',
        url: /tiered-pricing-offer/,
        response: { body: JSON.stringify(mockedResponse) },
    };
};

export const mockOffersByLocale = (
    locale: LocaleKeys,
    hasAddons?: boolean,
    removeQuery?: boolean,
): IMock => {
    mockLocale(locale);
    mockCurrency(locale);

    const addons = (hasAddons ? AddonsResponse.Addons : []) as Addon[];

    const mockedResponse: OffersResponse = {
        ...mockResponseMap[locale],
        Addons: addons,
    };

    return mockOffersRequest({ ...defaultOffersResponse, ...mockedResponse }, removeQuery);
};
