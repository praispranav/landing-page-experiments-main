import { ResourceStringsKeys } from '@config/ConfigsKeys';
// eslint-disable-next-line jest/no-mocks-import
import { hookOptionsWithConfig } from '@experiments/__mocks__/MockProviderConfig';
import { renderHook } from '@testing-library/react-hooks';

import {
    useDictionaryString,
    useLocalisedStringKey,
    useResourceStringKey,
} from './UseLocalisedStrings';

describe('UseLocalisedStrings', () => {
    beforeEach(() => {
        Object.defineProperty(window, 'location', {
            value: {
                pathname: '/e_ar_landingpageredesign_versusoldlp/redesign',
                search: '?region=de',
            },
            writable: true,
        });
    });

    describe('useLocalisedStringKey', () => {
        it('should return the correct string', () => {
            const { result } = renderHook(
                () => useLocalisedStringKey(ResourceStringsKeys.HeroTitle),
                hookOptionsWithConfig,
            );

            expect(result.current).toBe('YOUR SPORTS LIVE AND ON DEMAND');
        });

        it('should replace the placeholder by the variable passed', () => {
            const savingTotal = 10;

            const { result } = renderHook(
                () =>
                    useLocalisedStringKey(ResourceStringsKeys.HeroOfferSavingTotal, {
                        savingTotal,
                    }),
                hookOptionsWithConfig,
            );

            expect(result.current).toEqual(`Save ${savingTotal}`);
        });

        it('should return the canonical string if no variable is passed', () => {
            const { result } = renderHook(
                () => useLocalisedStringKey(ResourceStringsKeys.HeroOfferSavingTotal),
                hookOptionsWithConfig,
            );

            expect(result.current).toEqual('Save %{savingTotal}');
        });
    });

    describe('useDictionaryString', () => {
        it('should return the correct string', () => {
            const { result } = renderHook(
                () => useDictionaryString('landingpages_web_hero_title'),
                hookOptionsWithConfig,
            );

            expect(result.current).toBe('YOUR SPORTS LIVE AND ON DEMAND');
        });

        it('should replace the placeholder by the variable passed', () => {
            const savingTotal = 10;

            const { result } = renderHook(
                () =>
                    useDictionaryString('landingpages_web_hero_savingTotal', {
                        savingTotal,
                    }),
                hookOptionsWithConfig,
            );

            expect(result.current).toEqual(`Save ${savingTotal}`);
        });
    });

    describe('useResourceStringKey', () => {
        it('should return the correct string label', () => {
            const { result } = renderHook(
                () => useResourceStringKey(ResourceStringsKeys.HeroTitle),
                hookOptionsWithConfig,
            );

            expect(result.current).toBe('landingpages_web_hero_title');
        });
    });
});
