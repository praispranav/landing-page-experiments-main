import { fireEvent, render, waitFor } from '@testing-library/react';
import { ElementSection } from '@tracking/events.types';
import { triggerElementClick } from '@tracking/index';
// eslint-disable-next-line jest/no-mocks-import
import { spySetCurrentChapter } from '@utils/dazn/__mocks__/MockChapterHistory';
import { random } from 'faker';
import { DaznChapterEnum } from 'types/dazn/DaznChapterEnum';

import { FaqArticle } from './FaqArticle';

jest.mock('@tracking/index');

describe('Faq Article', () => {
    describe('Loading', () => {
        test("should render a skeleton when there's no title", async () => {
            const { queryByTestId } = render(<FaqArticle title="" path="" />);

            await waitFor(() => expect(queryByTestId('FAQ_ARTICLE_TITLE_SKELETON')).toBeTruthy());
        });

        test("should not render a skeleton when there's no title", async () => {
            const expectedTitle = random.words(3);
            const { queryByTestId } = render(<FaqArticle title={expectedTitle} path="" />);

            await waitFor(() => expect(queryByTestId('FAQ_ARTICLE_TITLE_SKELETON')).toBeFalsy());
        });

        test('should not set the current chapter if the url is empty', async () => {
            const { findByTestId } = render(<FaqArticle title="" path="" />);

            const spiedSetChapter = spySetCurrentChapter();

            const article = await findByTestId('FAQ_ARTICLE');
            article.click();
            fireEvent(article, new MouseEvent('click'));

            expect(spiedSetChapter).not.toHaveBeenCalled();
        });
    });

    describe('With content', () => {
        test('should assign the URL to the correct path of the article', async () => {
            const expectedPath = '/category/payments_billing';
            const spiedSetChapter = spySetCurrentChapter();
            const { findByTestId } = render(<FaqArticle title="" path={expectedPath} />);

            const article = await findByTestId('FAQ_ARTICLE');
            article.click();
            fireEvent(article, new MouseEvent('click'));

            expect(spiedSetChapter).toHaveBeenCalledWith({
                chapterName: DaznChapterEnum.Help,
                chapterPath: expectedPath,
            });
        });

        test('should display the article title when it is passed', async () => {
            const expectedTitle = random.words(3);
            const { findByTestId } = render(<FaqArticle title={expectedTitle} path="" />);

            const title = await findByTestId('FAQ_ARTICLE_TITLE');
            expect(title).toHaveTextContent(expectedTitle);
        });
    });

    describe('triggerElementClick', () => {
        test('should call triggerElementClick upon clicking on the article', async () => {
            const expectedTitle = random.words(3);
            const { findByTestId } = render(<FaqArticle title={expectedTitle} path="" />);

            const article = await findByTestId('FAQ_ARTICLE');
            article.click();
            fireEvent(article, new MouseEvent('click'));

            expect(triggerElementClick).toHaveBeenCalledWith({
                section: ElementSection.Body,
                itemId: 'faq_box',
                resourceString: expectedTitle,
            });
        });
    });
});
