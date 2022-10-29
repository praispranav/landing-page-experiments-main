export const getLocale = (): string => `${getLanguage()}-${getCountry()}`;

export const getCountry = (): string => window.dazn.startupData.Region.Country.toLocaleUpperCase();
export const getLanguage = (): string => window.dazn.language;

export const getSupportedLanguages = (): string[] => window.dazn.startupData.SupportedLanguages;

export const getCurrency = (): string => window.dazn.startupData.Region.Currency;
