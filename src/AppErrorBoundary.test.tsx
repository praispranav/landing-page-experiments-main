import { render } from '@testing-library/react';
import { setCurrentChapter } from '@utils/dazn/ChapterHistory';
import { trackException } from '@utils/dazn/Error';
import { FC } from 'react';
import { DaznChapterEnum } from 'types/dazn/DaznChapterEnum';

jest.mock('@utils/dazn/ChapterHistory');
jest.mock('@utils/dazn/Error');

import { AppErrorBoundary } from './AppErrorBoundary';

const MockError = new Error('Test error');
const MockErrorChildren: FC = () => {
    throw MockError;
};

const MockErrorContainer: FC = () => (
    <AppErrorBoundary>
        <MockErrorChildren />
    </AppErrorBoundary>
);

const silenceConsoleError = (): void => {
    jest.spyOn(console, 'error').mockImplementation(jest.fn());
};

describe('AppErrorBoundary', () => {
    beforeEach(() => {
        silenceConsoleError();
    });

    it('should track the error thrown within the error boundary', () => {
        render(<MockErrorContainer />);

        expect(trackException as jest.Mock).toHaveBeenCalledWith(MockError);
    });

    it(`should set the current chapter to ${DaznChapterEnum.OpenBrowse}`, () => {
        render(<MockErrorContainer />);

        expect(setCurrentChapter as jest.Mock).toHaveBeenCalledWith(DaznChapterEnum.OpenBrowse);
    });
});
