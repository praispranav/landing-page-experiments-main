export type LocaleKeys =
    | 'en-CA'
    | 'en-US'
    | 'pt-BR'
    | 'ja-JP'
    | 'de-DE'
    | 'en-CH'
    | 'de-AT'
    | 'it-IT'
    | 'es-ES'

    // Moon
    | 'en-IE'
    | 'en-GB'
    | 'nl-NL'
    | 'ru-RU'
    | 'en-AU'
    | 'en-NZ';

export const currencyMap: Record<LocaleKeys, string> = {
    'ru-RU': 'rub',
    'en-CA': 'cad',
    'en-US': 'usd',
    'en-AU': 'usd',
    'en-NZ': 'usd',
    'en-GB': 'gbp',
    'en-IE': 'eur',
    'pt-BR': 'brl',
    'ja-JP': 'jpy',
    'de-DE': 'eur',
    'nl-NL': 'eur',
    'en-CH': 'chf',
    'de-AT': 'eur',
    'it-IT': 'eur',
    'es-ES': 'eur',
};
