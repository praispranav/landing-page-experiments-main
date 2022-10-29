import { ThemeEnum } from '@components/Style/Theme';
import { ResourceStringsKeys } from '@config/ConfigsKeys';
import { useFaq } from '@hooks/dazn/help/UseFaq';
import { useLocalisedStringKey } from '@hooks/resourceStrings/UseLocalisedStrings';
import { ElementVisibilitySections } from '@tracking/events.types';
import { useImpressionTracking } from '@tracking/hooks/useImpressionTracking';
import React, { FC, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { Base } from '../Base/Base';
import { articlesContainerStyle, titleStyle } from './Faq.style';
import { FaqArticle } from './FaqArticle/FaqArticle';

const FaqArticlesContainer: FC = ({ children }) => <ul css={articlesContainerStyle}>{children}</ul>;

const FaqArticlesFallback: FC = () => (
    <FaqArticlesContainer>
        <FaqArticle
            title={useLocalisedStringKey(ResourceStringsKeys.FaqGettingStarted)}
            path="help/categories/getting_started"
        />

        <FaqArticle
            title={useLocalisedStringKey(ResourceStringsKeys.FaqManageMyAccount)}
            path="help/categories/manage_my_account"
        />

        <FaqArticle
            title={useLocalisedStringKey(ResourceStringsKeys.FaqWatchingDazn)}
            path="help/categories/watching_dazn"
        />

        <FaqArticle
            title={useLocalisedStringKey(ResourceStringsKeys.FaqPaymentAndBilling)}
            path="help/categories/payment_and_billing"
        />
    </FaqArticlesContainer>
);

const FaqArticlesLoading: FC = () => (
    <FaqArticlesContainer>
        <FaqArticle title="" path="" />
        <FaqArticle title="" path="" />
        <FaqArticle title="" path="" />
    </FaqArticlesContainer>
);

const FaqArticlesList: FC = () => {
    const articles = useFaq();

    return (
        <>
            {articles.map(({ path: url, title }) => (
                <FaqArticle key={url} title={title} path={url} />
            ))}
        </>
    );
};

export const Faq: FC = () => {
    const { setTrackingRef } = useImpressionTracking(ElementVisibilitySections.Faq);

    return (
        <Base theme={ThemeEnum.ExtraDark} ref={setTrackingRef} testId="FAQ_SECTION">
            <Base.Container>
                <h1 css={titleStyle}>{useLocalisedStringKey(ResourceStringsKeys.FaqTitle)}</h1>

                <ErrorBoundary fallback={<FaqArticlesFallback />}>
                    <Suspense fallback={<FaqArticlesLoading />}>
                        <FaqArticlesContainer>
                            <FaqArticlesList />
                        </FaqArticlesContainer>
                    </Suspense>
                </ErrorBoundary>
            </Base.Container>
        </Base>
    );
};
