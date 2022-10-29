import { setCurrentChapter } from '@utils/dazn/ChapterHistory';
import { trackException } from '@utils/dazn/Error';
import React, { FC } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { DaznChapterEnum } from 'types/dazn/DaznChapterEnum';

const onError = (error: Error): void => {
    trackException(error);
    setCurrentChapter(DaznChapterEnum.OpenBrowse);
};

export const AppErrorBoundary: FC = ({ children }) => (
    <ErrorBoundary fallback={<div />} onError={onError}>
        {children}
    </ErrorBoundary>
);
