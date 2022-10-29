import { ResourceStringLabel } from '@hooks/resourceStrings/Types';
import { IResourceStringsData } from 'types/dazn/ResourceStrings';

import { getDictionaryLink, getDictionaryString } from './ResourcesDictionary';

const mockResourceString = (key: string, value: string): void => {
    window.dazn.resourceStringsData = ({
        ...window.dazn.resourceStringsData,
        Strings: {
            [key]: value,
        },
    } as unknown) as IResourceStringsData;
};

describe('Resources Dictionary', () => {
    const wrongString = 'landing_redesign_de_test_title' as ResourceStringLabel;
    const testString = 'test' as ResourceStringLabel;

    describe('getDictionaryString', () => {
        it("returns an empty string if the key doesn't exist", () => {
            const result = getDictionaryString(wrongString);

            expect(result).toEqual('');
        });

        it('returns the related string if the key exists', () => {
            const result = getDictionaryString('landingpages_web_hero_title');

            expect(result).toEqual('YOUR SPORTS LIVE AND ON DEMAND');
        });

        it('should replace all mapped key value patterns in a string', () => {
            mockResourceString('test', 'hello %{replaceOne}, hello %{replaceTwo}');
            const result = getDictionaryString(testString, {
                replaceOne: 'Odyssey',
                replaceTwo: 'Clavius',
            });

            expect(result).toBe('hello Odyssey, hello Clavius');
        });

        it.each`
            action              | value        | expectedResult
            ${'replace string'} | ${'b'}       | ${'b'}
            ${'replace number'} | ${123}       | ${'123'}
            ${'keep'}           | ${undefined} | ${'%{placeholder}'}
            ${'keep'}           | ${null}      | ${'%{placeholder}'}
        `('should $action $value => $expectedResult', ({ value, expectedResult }) => {
            mockResourceString('test', 'a %{placeholder} %{placeholder} c');
            const result = getDictionaryString(testString, { placeholder: value });

            expect(result).toBe(`a ${expectedResult} ${expectedResult} c`);
        });

        it('should replace all the given placeholders', () => {
            mockResourceString('test', '%{replaceMe}\n hello %{replaceMe} \ngoodbye %{replaceMe}');
            const result = getDictionaryString(testString, { replaceMe: 'Odyssey' });

            expect(result).toBe('Odyssey\n hello Odyssey \ngoodbye Odyssey');
        });
    });

    describe('getDictionaryLink', () => {
        it('should replace the key with an url', () => {
            const result = getDictionaryLink('Terms');
            expect(result).toBe('https://stag.dazn.com/help/articles/terms-de');
        });
    });
});
