import { FooterElements } from '@config/ConfigsKeys';
import { ResourceStringLabel } from '@hooks/resourceStrings/Types';
import {
    useLocalisedStringKey,
    useResourceStringKey,
} from '@hooks/resourceStrings/UseLocalisedStrings';
import { getCountry, getLanguage, getSupportedLanguages } from '@utils/dazn/Region';
import { getLocaleString, getPathParts } from '@utils/Url';

export const getLanguageSwitcherUrl = (): string => {
    const supportedLanguages = getSupportedLanguages();
    const country = getCountry();
    const currentLanguage = getLanguage();

    const language = supportedLanguages.find((lang) => lang !== currentLanguage) ?? currentLanguage;
    const locale = getLocaleString(language, country);

    const { pathname, origin, search } = window.location;
    const [, restPath] = getPathParts(pathname);

    const { href } = new URL(`${locale}/${restPath}${search}`, origin);

    return href;
};

export const useLanguageSwitcherData = (): {
    languageSwitcherLabel: string;
    languageSwitcherkey: ResourceStringLabel | '';
} => {
    const supportedLanguages = getSupportedLanguages();
    const languageSwitcherkey = useResourceStringKey(FooterElements.FooterLanguageSwitcher);

    const copy = useLocalisedStringKey(FooterElements.FooterLanguageSwitcher);
    const languageSwitcherLabel = supportedLanguages.length > 1 ? copy : '';

    return { languageSwitcherLabel, languageSwitcherkey };
};
