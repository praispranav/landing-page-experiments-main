export const getPathParts = (pathname: string): string[] => {
    const [, locale, ...restSegments] = pathname.split('/');
    const restPath = restSegments.join('/');

    return [locale, restPath];
};

export const getLocaleString = (language: string, country: string): string =>
    `${language}-${country.toUpperCase()}`;
