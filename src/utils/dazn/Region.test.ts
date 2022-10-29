// eslint-disable-next-line jest/no-mocks-import
import { IStartupData } from 'types/dazn/StartupData';

// eslint-disable-next-line jest/no-mocks-import
import { LocaleKeys } from './__mocks__/constants';
// eslint-disable-next-line jest/no-mocks-import
import { mockCurrency, mockLocale, mockSupportedLanguages } from './__mocks__/MockRegion';
import { getCountry, getCurrency, getLanguage, getLocale, getSupportedLanguages } from './Region';

const mockedLanguage = 'en';
const mockedCountry = 'US';
const mockedLocale = `${mockedLanguage}-${mockedCountry}` as LocaleKeys;
const mockedCurrency = 'usd';
const mockedSupportedLanguages = ['en', 'es'];

window.dazn.startupData = {
    Region: {},
} as IStartupData;

describe('Region', () => {
    test('getLocale', () => {
        mockLocale(mockedLocale);
        expect(getLocale()).toBe(mockedLocale);
    });

    test('getCountry', () => {
        mockLocale(mockedLocale);
        expect(getCountry()).toBe(mockedCountry);
    });

    test('getLanguage', () => {
        mockLocale(mockedLocale);
        expect(getLanguage()).toBe(mockedLanguage);
    });

    test('getCurrency', () => {
        mockCurrency(mockedLocale);
        expect(getCurrency()).toBe(mockedCurrency);
    });

    test('getSupportedLanguages', () => {
        mockSupportedLanguages(mockedSupportedLanguages);
        expect(getSupportedLanguages()).toBe(mockedSupportedLanguages);
    });
});
