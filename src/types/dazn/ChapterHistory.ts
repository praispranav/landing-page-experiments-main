import { DaznChapterEnum } from './DaznChapterEnum';

export interface IChapterData {
    chapterName: DaznChapterEnum;
    chapterPath: string;
}

export interface IChapterHistory {
    currentChapter: DaznChapterEnum | IChapterData;
    getChapterFromPath: (pathname: string) => string;
}
