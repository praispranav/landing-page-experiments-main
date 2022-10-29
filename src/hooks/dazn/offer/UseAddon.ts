import { ElementSettingKeys } from '@config/ConfigsKeys';
import { useElementSetting } from '@hooks/utils/UseLocalisedConfig';
import { getCurrency } from '@utils/dazn/Region';
import { Addon, ChargeTier } from 'types/dazn/RatePlans/Offers';

import {
    formatChargeWithCurrency,
    getChargeForCurrency,
    getPriceFromChargeTier,
} from './shared/ChargeTier';
import { useOffersService } from './shared/UseOfferService';

export type AddonWithCharge = Omit<Addon, 'ChargeTiers'> & { Charge?: ChargeTier };
const mapAddonWithCharge = (
    currency: string,
    { ChargeTiers, ...addon }: Addon,
): AddonWithCharge => ({
    ...addon,
    Charge: getChargeForCurrency(currency, ChargeTiers),
});

interface IAddonsResult {
    value: string;
    length: number;
}

export const useAddons = (): IAddonsResult => {
    const { data } = useOffersService();

    const currency = getCurrency();

    const addons = data?.Addons ?? [];
    const addonsWithCurrentCurrency = addons.map((addon) => mapAddonWithCharge(currency, addon));

    const addonsTotalChargeTier: ChargeTier = addonsWithCurrentCurrency.reduce(
        (acc, addon) => {
            if (!addon.Charge) {
                return acc;
            }

            acc.Price += getPriceFromChargeTier(addon.Charge);
            return acc;
        },
        { Currency: currency, Price: 0 },
    );

    const addonsTotalFormatted = formatChargeWithCurrency(addonsTotalChargeTier);

    return { value: addonsTotalFormatted, length: addons.length };
};

export const useAddon = (entitlementId: string): AddonWithCharge | undefined => {
    const { data } = useOffersService();

    const addons = data?.Addons ?? [];
    const addonFound = addons.find((addon) => addon.EntitlementSetId === entitlementId);

    if (!addonFound) {
        return undefined;
    }

    return mapAddonWithCharge(getCurrency(), addonFound);
};

export const useShouldDisplayPPV = (): boolean => {
    const isFeatureEnabled = useElementSetting(ElementSettingKeys.PPVFeatureFlag);
    const isAddonExist = useAddons().length > 0;

    return Boolean(isFeatureEnabled) && isAddonExist;
};

export const useGetClosestAddon = (): AddonWithCharge | undefined => {
    const { data } = useOffersService();

    const addons = data?.Addons;

    if (!addons || !addons.length) {
        return undefined;
    }

    const currentDate = Date.now();

    const sortedAddon = addons.sort((a, b) => {
        const aStartDate = a?.EventStartDate ? new Date(a.EventStartDate).valueOf() : 0;
        const bStartDate = b?.EventStartDate ? new Date(b.EventStartDate).valueOf() : 0;

        return aStartDate - bStartDate;
    });

    const closestAddon =
        sortedAddon.find((addon) => new Date(addon.EventStartDate).valueOf() > currentDate) ??
        sortedAddon[sortedAddon.length - 1];

    return mapAddonWithCharge(getCurrency(), closestAddon);
};
