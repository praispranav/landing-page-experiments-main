// eslint-disable-next-line jest/no-mocks-import
import { ElementSettingKeys } from '@config/ConfigsKeys';
// eslint-disable-next-line jest/no-mocks-import
import MockExperimentConfig from '@experiments/__mocks__/MockExperimentConfig.json';
// eslint-disable-next-line jest/no-mocks-import
import {
    MockProviderConfig,
    MockProviderConfigProps,
} from '@experiments/__mocks__/MockProviderConfig';
// eslint-disable-next-line jest/no-mocks-import
import { MockVariantConfig } from '@experiments/__mocks__/MockVariantConfig';
// eslint-disable-next-line jest/no-mocks-import
import { ILocalVariantConfig, IVariantConfig } from '@experiments/IVariantConfig';
import { VariantLocalElements, VariantLocalLists } from '@hooks/resourceStrings/Types';
import { renderHook, RenderHookOptions } from '@testing-library/react-hooks';

import {
    useElementSetting,
    useLocalisedImage,
    useLocalisedLists,
    useVariantConfig,
    useVariantLink,
} from './UseLocalisedConfig';

describe('UseLocalisedStrings', () => {
    const hookOptions: RenderHookOptions<Partial<ILocalVariantConfig>> = {
        wrapper: MockProviderConfig,
        initialProps: {
            strings: MockVariantConfig.strings,
            images: MockExperimentConfig.REDESIGN.DE.imagesConfig,
            links: MockExperimentConfig.REDESIGN.DE.linksConfig,
            lists: MockExperimentConfig.REDESIGN.DE.listsConfig as VariantLocalLists,
            elements: MockExperimentConfig.REDESIGN.DE.elementsConfig as VariantLocalElements,
        },
    };

    beforeEach(() => {
        Object.defineProperty(window, 'location', {
            value: {
                pathname: '/e_ar_landingpageredesign_versusoldlp/redesign',
                search: '?region=de',
            },
            writable: true,
        });
    });

    describe('useVariantConfig', () => {
        it('should dispatch for each data type passed', () => {
            const mockDispatch = jest.fn();
            const localVariantConfig = MockExperimentConfig.REDESIGN.DE;

            const variantHookOptions: RenderHookOptions<Partial<MockProviderConfigProps>> = {
                wrapper: MockProviderConfig,
                initialProps: { dispatch: mockDispatch },
            };

            renderHook(
                () => useVariantConfig(localVariantConfig as IVariantConfig),
                variantHookOptions,
            );

            const actionImages = { type: 'Images', payload: localVariantConfig.imagesConfig };
            const actionLinks = { type: 'Links', payload: localVariantConfig.linksConfig };
            const actionLists = { type: 'Lists', payload: localVariantConfig.listsConfig };
            const actionStrings = { type: 'Strings', payload: localVariantConfig.stringsConfig };
            const actionElements = { type: 'Elements', payload: localVariantConfig.elementsConfig };

            expect(mockDispatch).toHaveBeenNthCalledWith(1, actionImages);
            expect(mockDispatch).toHaveBeenNthCalledWith(2, actionLinks);
            expect(mockDispatch).toHaveBeenNthCalledWith(3, actionLists);
            expect(mockDispatch).toHaveBeenNthCalledWith(4, actionStrings);
            expect(mockDispatch).toHaveBeenNthCalledWith(5, actionElements);
        });
    });

    describe('useLocalisedImages', () => {
        it('should return the correct img', () => {
            const { result } = renderHook(() => useLocalisedImage('HERO_BACKGROUND'), hookOptions);

            expect(result.current).toEqual('./img');
        });
    });

    describe('useLocalisedLink', () => {
        it('should return a string of links incase the argumant was a string', () => {
            const { result } = renderHook(() => useVariantLink('DEVICES_BUTTON'), hookOptions);

            expect(result.current).toEqual(
                'https://www.dazn.com/en-US/help/articles/what-are-dazn-supported-devices',
            );
        });
    });

    describe('useLocalisedlists', () => {
        it('should return the correct list', () => {
            const { result } = renderHook(() => useLocalisedLists('FOOTER'), hookOptions);
            const expected = [
                {
                    href: 'https://www.dazn.com/help',
                    key: 'footer_help',
                    label: 'HELP',
                },
            ];

            expect(result.current).toEqual(expected);
        });
    });

    describe('useElementSetting', () => {
        it('should return the correct setting for an element', () => {
            const { result } = renderHook(
                () => useElementSetting(ElementSettingKeys.HeroOfferDisplayType),
                hookOptions,
            );

            expect(result.current).toEqual('COPY');
        });
    });
});
