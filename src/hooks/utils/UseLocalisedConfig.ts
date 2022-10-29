import { IVariantConfig } from '@experiments/IVariantConfig';
import { VariantConfigsContext } from '@experiments/VariantConfigsContext';
import {
    LocalImageValue,
    VariantLocalElements,
    VariantLocalList,
} from '@hooks/resourceStrings/Types';
import { useContext, useEffect } from 'react';

export const useVariantConfig = (config?: IVariantConfig): void => {
    const { dispatch } = useContext(VariantConfigsContext);

    useEffect(() => {
        dispatch({ type: 'Images', payload: config?.imagesConfig });
        dispatch({ type: 'Links', payload: config?.linksConfig });
        dispatch({ type: 'Lists', payload: config?.listsConfig });
        dispatch({ type: 'Strings', payload: config?.stringsConfig });
        dispatch({ type: 'Elements', payload: config?.elementsConfig });
    }, [config, dispatch]);
};

export const useVariantLink = (linkKey: string): string => {
    const { links } = useContext(VariantConfigsContext).config;

    return links[linkKey] || '';
};

export const useLocalisedImage = (imageKey: string): LocalImageValue | undefined => {
    const { images } = useContext(VariantConfigsContext).config;

    return images[imageKey];
};

export const useLocalisedLists = (listKey: string): VariantLocalList | undefined => {
    const { lists } = useContext(VariantConfigsContext).config;

    return lists[listKey];
};

export const useElementSetting = <T extends keyof VariantLocalElements>(
    item: T,
): VariantLocalElements[T] | undefined => {
    const { elements } = useContext(VariantConfigsContext).config;

    return elements[item];
};
