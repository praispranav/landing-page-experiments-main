import { getLanguageSwitcherUrl } from './LanguageSwitcher.hooks';

describe('LanguageSwitcher', () => {
    it('constructs the required URL when getLanguageSwitcherUrl is called', () => {
        const expectedURL = 'https://www.dazn.com/de-DE/welcome?q=promotion';
        Object.defineProperty(window, 'location', {
            value: {
                origin: 'https://www.dazn.com',
                pathname: '/en-DE/welcome',
                search: '?q=promotion',
            },
            writable: true,
        });

        expect(getLanguageSwitcherUrl()).toBe(expectedURL);
    });
});
