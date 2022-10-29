import { IFaqArticle, IFaqResponseArticle } from '../types';
import { faqResponseDE } from './faqResponseDE';

export const getFaqArticlesMock = (mockLocale: string): IFaqArticle[] =>
    faqResponseDE.articles.map(({ url, ...article }: IFaqResponseArticle) => ({
        ...article,
        path: `${mockLocale}/help/articles/${url}`,
    }));
