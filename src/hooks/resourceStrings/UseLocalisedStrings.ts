import { VariantConfigsContext } from '@experiments/VariantConfigsContext';
import { getDictionaryString, IStringTemplateVariables } from '@utils/dazn/ResourcesDictionary';
import { useContext, useMemo } from 'react';

import { ResourceStringLabel, StringsConfigKey } from './Types';

export const useResourceStringKey = (stringKey: StringsConfigKey): ResourceStringLabel | '' => {
    const { strings } = useContext(VariantConfigsContext).config;
    return strings[stringKey] ?? '';
};

export const useDictionaryString = (
    resourceStringKey: ResourceStringLabel | '',
    placeholdersValue: IStringTemplateVariables = {},
): string =>
    useMemo(
        () => getDictionaryString(resourceStringKey, placeholdersValue),
        [resourceStringKey, placeholdersValue],
    );

export const useLocalisedStringKey = (
    localStringKey: StringsConfigKey,
    placeholdersValue?: IStringTemplateVariables,
): string => {
    const resourceStringKey = useResourceStringKey(localStringKey);

    return getDictionaryString(resourceStringKey, placeholdersValue);
};
