import { getLocaleString, getPathParts } from './Url';
describe('URL', () => {
    it('constructs locale when getLocaleString is called', () => {
        expect(getLocaleString('en', 'de')).toBe('en-DE');
    });

    it('returns the locale and the rest of the path when getPathParts is called', () => {
        expect(getPathParts('/en-DE/l/sports')).toEqual(['en-DE', 'l/sports']);
    });
});
