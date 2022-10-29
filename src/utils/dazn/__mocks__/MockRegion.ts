import { currencyMap, LocaleKeys } from './constants';

export const mockLocale = <L extends LocaleKeys>(locale: L): void => {
    const [language, country] = locale.split('-');

    window.dazn.startupData.Region.Country = country;
    window.dazn.language = language;
};

export const mockCurrency = (locale: LocaleKeys): void => {
    window.dazn.startupData.Region.Currency = currencyMap[locale];
};

export const mockSupportedLanguages = (SupportedLanguages: string[]): void => {
    window.dazn.startupData.SupportedLanguages = SupportedLanguages;
};
