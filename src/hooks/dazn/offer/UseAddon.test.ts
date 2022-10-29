import { QueryClientWrapper } from '@config/QueryClient';
import { useElementSetting } from '@hooks/utils/UseLocalisedConfig';
import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { getCurrency } from '@utils/dazn/Region';
import { random } from 'faker';
import { Addon } from 'types/dazn/RatePlans/Offers';

// eslint-disable-next-line jest/no-mocks-import
import AddonsResponse from './__mocks__/AddonsResponse.json';
// eslint-disable-next-line jest/no-mocks-import
import OffersResponseDE from './__mocks__/OffersResponseDE.json';
import { formatChargeWithCurrency } from './shared/ChargeTier';
import { useOffersService } from './shared/UseOfferService';
import {
    AddonWithCharge,
    useAddon,
    useAddons,
    useGetClosestAddon,
    useShouldDisplayPPV,
} from './UseAddon';

const currency = 'USD';

jest.mock('./shared/UseOfferService');
jest.mock('@utils/dazn/Region', () => ({
    ...jest.requireActual('@utils/dazn/Region'),
    getCurrency: jest.fn().mockReturnValue(currency),
}));
jest.mock('@hooks/utils/UseLocalisedConfig');

describe('UseAddon', () => {
    beforeEach(() => {
        const mockOffersWithAddons = { ...OffersResponseDE, ...AddonsResponse };
        (useOffersService as jest.Mock).mockReturnValue({ data: mockOffersWithAddons });
        (getCurrency as jest.Mock).mockReturnValue(currency.toLowerCase());

        (useElementSetting as jest.Mock).mockReturnValue(true);
    });

    it("should return the total value of addons as 0, when there's no addon", async () => {
        (useOffersService as jest.Mock).mockReturnValue({
            data: { ...OffersResponseDE, Addons: [] },
        });
        const { result } = renderHook(() => useAddons(), { wrapper: QueryClientWrapper });

        await waitFor(() => expect(result.current).not.toBeUndefined());
        const expectedResult = formatChargeWithCurrency({ Price: 0, Currency: currency });

        expect(result.current.value).toStrictEqual(expectedResult);
    });

    it('should sum the total value of addons', async () => {
        const { result } = renderHook(() => useAddons(), { wrapper: QueryClientWrapper });

        await waitFor(() => expect(result.current).not.toBeUndefined());
        const expectedResult = formatChargeWithCurrency({ Price: 49.99, Currency: currency });

        expect(result.current.value).toStrictEqual(expectedResult);
    });

    it('should return the addons length', async () => {
        const { result } = renderHook(() => useAddons(), { wrapper: QueryClientWrapper });

        await waitFor(() => expect(result.current).not.toBeUndefined());

        expect(result.current.length).toStrictEqual(AddonsResponse.Addons.length);
    });

    it('should find the addon by entitlement id', async () => {
        const { result } = renderHook(() => useAddon('entitlement_set_id'), {
            wrapper: QueryClientWrapper,
        });

        await waitFor(() => expect(result.current).not.toBeUndefined());

        const [{ ChargeTiers, ...addon }] = AddonsResponse.Addons as Addon[];

        const expectedAddon: AddonWithCharge = {
            ...addon,
            Charge: ChargeTiers[0],
        };

        expect(result.current).toStrictEqual(expectedAddon);
    });

    it("should return undefined if there's no addon for a given entitlement id", async () => {
        const { result } = renderHook(() => useAddon(random.word()), {
            wrapper: QueryClientWrapper,
        });

        expect(result.current).toStrictEqual(undefined);
    });

    it('should display ppv when the amount of addons is > 0', async () => {
        const { result } = renderHook(() => useShouldDisplayPPV(), { wrapper: QueryClientWrapper });

        await waitFor(() => expect(result.current).not.toBeUndefined());
        expect(result.current).toBeTruthy();
    });

    it("shouldn't display ppv when the feature flag is disabled", async () => {
        (useElementSetting as jest.Mock).mockReturnValue(false);
        const { result } = renderHook(() => useShouldDisplayPPV(), { wrapper: QueryClientWrapper });

        await waitFor(() => expect(result.current).not.toBeUndefined());
        expect(result.current).toBeFalsy();
    });

    it("should't display ppv when the amount of addons is 0", async () => {
        (useOffersService as jest.Mock).mockReturnValue({
            data: { ...OffersResponseDE, Addons: [] },
        });

        const { result } = renderHook(() => useShouldDisplayPPV(), { wrapper: QueryClientWrapper });

        await waitFor(() => expect(result.current).not.toBeUndefined());
        expect(result.current).toBeFalsy();
    });

    describe('useGetClosestAddon', () => {
        const dayInMS = 86400000;
        const yesterday = new Date(Date.now() + dayInMS).toISOString;
        const tomorrow = new Date(Date.now() + dayInMS).toISOString;

        const addonPast = {
            EventStartDate: `${yesterday}`,
            ChargeTiers: [
                {
                    Price: 49.99,
                    Currency: 'USD',
                },
            ],
        };

        const addonFuture = {
            EventStartDate: `${tomorrow}`,
            ChargeTiers: [
                {
                    Price: 49.99,
                    Currency: 'USD',
                },
            ],
        };

        it('should return the closest addon in the future', async () => {
            (useOffersService as jest.Mock).mockReturnValueOnce({
                data: {
                    Addons: [addonFuture, addonPast],
                },
            });
            const { result } = renderHook(() => useGetClosestAddon(), {
                wrapper: QueryClientWrapper,
            });

            await waitFor(() => expect(result.current).not.toBeUndefined());

            const { ChargeTiers, ...addon } = addonFuture as Addon;

            const expectedAddon: AddonWithCharge = {
                ...addon,
                Charge: ChargeTiers[0],
            };

            expect(result.current).toStrictEqual(expectedAddon);
        });

        it('should return the closest addon in the past if no future addons exist', async () => {
            (useOffersService as jest.Mock).mockReturnValueOnce({
                data: {
                    Addons: [addonPast],
                },
            });
            const { result } = renderHook(() => useGetClosestAddon(), {
                wrapper: QueryClientWrapper,
            });

            await waitFor(() => expect(result.current).not.toBeUndefined());

            const { ChargeTiers, ...addon } = addonPast as Addon;

            const expectedAddon: AddonWithCharge = {
                ...addon,
                Charge: ChargeTiers[0],
            };

            expect(result.current).toStrictEqual(expectedAddon);
        });

        it("should return undefined if there's no addon", async () => {
            (useOffersService as jest.Mock).mockReturnValueOnce({ data: {} });

            const { result } = renderHook(() => useGetClosestAddon(), {
                wrapper: QueryClientWrapper,
            });

            expect(result.current).toStrictEqual(undefined);
        });
    });
});
