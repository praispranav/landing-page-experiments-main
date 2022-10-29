export interface IFaqResponseArticle {
    title: string;
    summary: string | null;
    url: string;
}
export interface IFaqArticle extends Omit<IFaqResponseArticle, 'url'> {
    path: string;
}

export interface IFaqResponse {
    categoryId: string;
    locale: string;
    order: number;
    articles: IFaqResponseArticle[];
}
