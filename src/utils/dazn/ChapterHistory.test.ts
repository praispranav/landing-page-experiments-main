import { proxyDazn } from '@test/DaznProxy';
import { random } from 'faker';
import { IChapterData } from 'types/dazn/ChapterHistory';
import { DaznChapterEnum } from 'types/dazn/DaznChapterEnum';

import { setCurrentChapter } from './ChapterHistory';

const proxyReceiver: { currentChapter: IChapterData | DaznChapterEnum } = {
    currentChapter: DaznChapterEnum.LandingPage,
};

describe('Chapter History', () => {
    beforeAll(() => proxyDazn('currentChapter', proxyReceiver));

    test('should set the chapter when passing only the chapter name', () => {
        const expectedChapterHistory = DaznChapterEnum.SignIn;

        setCurrentChapter(expectedChapterHistory);
        expect(proxyReceiver.currentChapter).toBe(expectedChapterHistory);
    });

    test('should set the chapter when passing an object with chapter name and path', () => {
        const expectedChapterHistory: IChapterData = {
            chapterName: DaznChapterEnum.SignIn,
            chapterPath: random.word(),
        };

        setCurrentChapter(expectedChapterHistory);
        expect(proxyReceiver.currentChapter).toBe(expectedChapterHistory);
    });
});
