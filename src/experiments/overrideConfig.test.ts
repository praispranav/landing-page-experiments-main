import {
    DisplayTypeValues,
    ElementSettingKeys,
    HeroVariantEnum,
    ImagesKeys,
} from '@config/ConfigsKeys';
import { WhatsOnVariantEnum } from '@containers/sections/WhatsOn/Variants';
import { internet } from 'faker';

// eslint-disable-next-line jest/no-mocks-import
import { MockVariantConfig } from './__mocks__/MockVariantConfig';
import { ILocalVariantConfig } from './IVariantConfig';
import {
    overrideExperimentConfig,
    updateBackgroundUrl,
    updateDisplayType,
    updateHeroVariant,
    updateWhatsOnVariant,
} from './OverrideConfig';

describe('overrideConfig', () => {
    const mockSource = internet.url();
    const originalConfig = {
        images: {
            [ImagesKeys.HeroBackground]: mockSource,
        },
        elements: {
            [ElementSettingKeys.HeroOfferDisplayType]: DisplayTypeValues.Default,
            [ElementSettingKeys.HeroVariant]: HeroVariantEnum.Event,
        },
    } as unknown as ILocalVariantConfig;

    describe('Images', () => {
        describe('updateBackgroundUrl', () => {
            it('should return the value from originalConfig if heroBackgroundUrl is undefined', () => {
                const result = updateBackgroundUrl(originalConfig, undefined);

                expect(result).toBe(mockSource);
            });

            it('should return the heroBackgroundUrl value if is set', () => {
                const updatedSource = internet.url();

                const result = updateBackgroundUrl(originalConfig, updatedSource);
                expect(result).toBe(updatedSource);
            });
        });
    });

    describe('Elements', () => {
        it.each`
            element                                        | param
            ${ElementSettingKeys.PPVFeatureFlag}           | ${'showPPV'}
            ${ElementSettingKeys.MarketPropositionSection} | ${'showMarketProposition'}
        `(`should set $element when passing $param: true`, ({ element, param }) => {
            const overrideConfigFunction = overrideExperimentConfig({ [param]: true });

            const mockConfig = overrideConfigFunction(MockVariantConfig);
            expect(mockConfig).toHaveProperty(`elements.${element}`, true);
        });

        describe('updateDisplayType', () => {
            it('should return the value from originalConfig if offerDisplayType is undefined', () => {
                const result = updateDisplayType(originalConfig, undefined);
                expect(result).toBe(DisplayTypeValues.Default);
            });

            it('should return the value from originalConfig if offerDisplayType is a not known value', () => {
                const result = updateDisplayType(originalConfig, '' as DisplayTypeValues);
                expect(result).toBe(DisplayTypeValues.Default);
            });

            it('should return the offerDisplayType value if is set', () => {
                const result = updateDisplayType(originalConfig, DisplayTypeValues.Copy);
                expect(result).toBe(DisplayTypeValues.Copy);
            });
        });

        describe('updateHeroVariant', () => {
            it('should return the value from originalConfig if heroVariant is a not known value', () => {
                const result = updateHeroVariant(originalConfig, '' as HeroVariantEnum);
                expect(result).toBe(HeroVariantEnum.Event);
            });

            it('should return the heroVariant value if is set', () => {
                const result = updateHeroVariant(originalConfig, HeroVariantEnum.ManyTournaments);
                expect(result).toBe(HeroVariantEnum.ManyTournaments);
            });
        });

        describe('updateWhatsOnVariant', () => {
            it('should return the value from originalConfig if WhatsOnVariant is a not known value', () => {
                const result = updateWhatsOnVariant(originalConfig, '' as WhatsOnVariantEnum);
                expect(result).toBe(WhatsOnVariantEnum.Epg);
            });

            it('should return the WhatsOnVariant value if is set', () => {
                const result = updateWhatsOnVariant(originalConfig, WhatsOnVariantEnum.NextUp);
                expect(result).toBe(WhatsOnVariantEnum.NextUp);
            });
        });
    });
});
