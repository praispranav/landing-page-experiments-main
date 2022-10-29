import { ResourceStringLabel } from '@hooks/resourceStrings/Types';
import { IResourceStringsData } from 'types/dazn/ResourceStrings';

const STRING_TEMPLATE_REGEX = /%\{([^}]+)\}/g;

export type IStringTemplateVariables = Record<string, string | number>;

const insertTemplateVariables = (input: string, values: IStringTemplateVariables): string =>
    input.replace(STRING_TEMPLATE_REGEX, (found, variableName) => {
        const variableValue = values[variableName];
        const isNullish = variableValue === null || variableValue === undefined;

        return isNullish ? found : String(variableValue);
    });

export const getResourcesDictionary = (): IResourceStringsData => {
    const dictionary = window.dazn.resourceStringsData;

    if (dictionary instanceof Promise) {
        return {
            Links: [],
            Strings: {} as Record<ResourceStringLabel, string>,
            Metadata: {},
        };
    }

    return dictionary;
};

export const getDictionaryString = (
    key: ResourceStringLabel | '',
    placeholders: IStringTemplateVariables = {},
): string => {
    try {
        const dictionary = getResourcesDictionary();

        if (!key) {
            return '';
        }

        const value = dictionary.Strings[key] ?? '';
        return insertTemplateVariables(value, placeholders);
    } catch {
        return '';
    }
};

export const getDictionaryLink = (key = ''): string => {
    try {
        const dictionary = getResourcesDictionary();
        return dictionary.Links.find((link) => link.Key === key)?.Value ?? '';
    } catch {
        return '';
    }
};
