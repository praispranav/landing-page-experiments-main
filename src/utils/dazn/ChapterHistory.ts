import { IChapterData } from 'types/dazn/ChapterHistory';
import { DaznChapterEnum } from 'types/dazn/DaznChapterEnum';

export const setCurrentChapter = (currentChapter: DaznChapterEnum | IChapterData): void => {
    window.dazn.chapterHistory.currentChapter = currentChapter;
};
