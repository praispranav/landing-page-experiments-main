import { Icon } from '@components/Icons/Icon';
import colors from '@components/Style/Colors';
import { IFaqArticle } from '@hooks/dazn/help/types';
import { ElementSection } from '@tracking/events.types';
import { triggerElementClick } from '@tracking/index';
import { setCurrentChapter } from '@utils/dazn/ChapterHistory';
import { FC } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { DaznChapterEnum } from 'types/dazn/DaznChapterEnum';

import { articleStyle, chevronStyle, skeletonStyle, titleStyle } from './FaqArticle.style';

const FaqArticleSkeletonWrapper: FC = ({ children }) => (
    <span data-testid="FAQ_ARTICLE_TITLE_SKELETON">{children}</span>
);

const FaqArticleTitle: FC = ({ children }) => {
    const skeleton = (
        <Skeleton wrapper={FaqArticleSkeletonWrapper} css={skeletonStyle} width={180} height={24} />
    );

    return (
        <span css={titleStyle} data-testid="FAQ_ARTICLE_TITLE">
            {children || skeleton}
        </span>
    );
};

const onArticleClick = (articlePath: string, title: string) => (): void => {
    triggerElementClick({
        section: ElementSection.Body,
        itemId: 'faq_box',
        resourceString: title,
    });

    if (articlePath === '') {
        return;
    }

    setCurrentChapter({
        chapterName: DaznChapterEnum.Help,
        chapterPath: articlePath,
    });
};

export const FaqArticle: FC<Omit<IFaqArticle, 'summary'>> = ({ path: url, title }) => (
    <SkeletonTheme color={colors.tarmac} highlightColor={colors.white}>
        <li
            data-testid="FAQ_ARTICLE"
            role="article"
            css={articleStyle}
            onClick={onArticleClick(url, title)}
        >
            <FaqArticleTitle>{title}</FaqArticleTitle>

            <Icon name="chevron" css={chevronStyle} />
        </li>
    </SkeletonTheme>
);
