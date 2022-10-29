import * as ChapterHistory from '../ChapterHistory';

export const spySetCurrentChapter = (): jest.SpyInstance<
    ReturnType<typeof ChapterHistory.setCurrentChapter>
> => jest.spyOn(ChapterHistory, 'setCurrentChapter').mockImplementation(() => jest.fn());
