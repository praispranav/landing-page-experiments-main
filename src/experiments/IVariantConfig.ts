import {
    VariantLocalElements,
    VariantLocalImages,
    VariantLocalLinks,
    VariantLocalLists,
    VariantLocalStrings,
} from '@hooks/resourceStrings/Types';

export interface IVariantConfig {
    stringsConfig: VariantLocalStrings;
    linksConfig: VariantLocalLinks;
    imagesConfig: VariantLocalImages;
    listsConfig: VariantLocalLists;
    elementsConfig: VariantLocalElements;
}
export interface ILocalVariantConfig {
    strings: VariantLocalStrings;
    links: VariantLocalLinks;
    images: VariantLocalImages;
    lists: VariantLocalLists;
    elements: VariantLocalElements;
}
