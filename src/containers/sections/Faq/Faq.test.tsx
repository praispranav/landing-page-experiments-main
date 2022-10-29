import { ResourceStringsKeys } from '@config/ConfigsKeys';
import { QueryClientWrapper } from '@config/QueryClient';
// eslint-disable-next-line jest/no-mocks-import
import {
    hookOptionsWithConfig,
    renderWithVariantConfig,
} from '@experiments/__mocks__/MockProviderConfig';
// eslint-disable-next-line jest/no-mocks-import
import { getFaqArticlesMock } from '@hooks/dazn/help/__mocks__/MockUseFaq';
import * as useFaq from '@hooks/dazn/help/UseFaq';
import { StringsConfigKey } from '@hooks/resourceStrings/Types';
import { useLocalisedStringKey } from '@hooks/resourceStrings/UseLocalisedStrings';
import { fireEvent, RenderResult, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { ElementVisibilitySections } from '@tracking/events.types';
import { useImpressionTracking } from '@tracking/hooks/useImpressionTracking';
// eslint-disable-next-line jest/no-mocks-import
import { spySetCurrentChapter } from '@utils/dazn/__mocks__/MockChapterHistory';
// eslint-disable-next-line jest/no-mocks-import
import { mockServicePath } from '@utils/dazn/__mocks__/MockService';
import * as daznRegion from '@utils/dazn/Region';
import { DaznChapterEnum } from 'types/dazn/DaznChapterEnum';

import { Faq } from './Faq';

jest.mock('@tracking/hooks/useImpressionTracking');

const render = renderWithVariantConfig();

const checkArticle =
    ({ findByText }: RenderResult) =>
    async (title: string, link: string): Promise<void> => {
        const spiedSetChapter = spySetCurrentChapter();
        const article = await findByText(title);
        article.click();
        fireEvent(article, new MouseEvent('click'));

        expect(spiedSetChapter).toHaveBeenCalledWith({
            chapterName: DaznChapterEnum.Help,
            chapterPath: link,
        });
    };

describe('Faq', () => {
    const mockLocale = 'en-us';

    beforeEach(() => {
        (useImpressionTracking as jest.Mock).mockReturnValue({
            setTrackingRef: (): Record<string, string> => ({}),
        });
    });

    describe('When useFaq hook fails - Fallback to', () => {
        const fallbackArticles = [
            [ResourceStringsKeys.FaqGettingStarted, 'help/categories/getting_started'],
            [ResourceStringsKeys.FaqManageMyAccount, 'help/categories/manage_my_account'],
            [ResourceStringsKeys.FaqWatchingDazn, 'help/categories/watching_dazn'],
            [ResourceStringsKeys.FaqPaymentAndBilling, 'help/categories/payment_and_billing'],
        ];

        beforeEach(() => {
            jest.spyOn(useFaq, 'useFaq').mockImplementation(() => {
                throw new Error('FAQ Fallback Test');
            });
        });

        test.each(fallbackArticles)(
            'an FAQ article %s should be available with a link to %s',
            async (title, link) => {
                const spy = jest.spyOn(console, 'error');
                spy.mockImplementation(() => null);
                const { result } = renderHook(
                    () => useLocalisedStringKey(title as StringsConfigKey),
                    hookOptionsWithConfig,
                );

                const expectArticleExists = checkArticle(render(<Faq />));
                await expectArticleExists(result.current, link);
            },
        );
    });

    describe('When useFaq returns the articles - Renders', () => {
        const mockedArticles = getFaqArticlesMock(mockLocale);
        const testsArguments = mockedArticles.map(({ title, path: url }) => [title, url]);

        beforeEach(() => jest.spyOn(useFaq, 'useFaq').mockReturnValue(mockedArticles));

        test.each(testsArguments)(
            'should have an FAQ article with the title %s and the link %s',
            async (title, link) => {
                const expectArticleExists = checkArticle(render(<Faq />));
                await expectArticleExists(title, link);
            },
        );
    });

    describe('When useFaq is loading - Skeleton UI', () => {
        const mockFetch = (): Promise<Response> =>
            new Promise((resolve) => {
                setTimeout(() => resolve(new Response()), 10000);
            });

        test('should display three articles with skeleton content', async () => {
            jest.spyOn(daznRegion, 'getLocale').mockReturnValue(mockLocale);
            mockServicePath();
            window.fetch = mockFetch;

            const { queryAllByTestId } = render(<Faq />, { wrapper: QueryClientWrapper });

            await waitFor(() =>
                expect(queryAllByTestId('FAQ_ARTICLE_TITLE_SKELETON')).toHaveLength(3),
            );
        });
    });

    it('calls useImpressionTracking with the correct params', () => {
        render(<Faq />, { wrapper: QueryClientWrapper });

        expect(useImpressionTracking).toHaveBeenCalledWith(ElementVisibilitySections.Faq);
    });
});
