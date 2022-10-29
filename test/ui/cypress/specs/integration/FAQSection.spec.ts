import { IDazn } from 'types/dazn';

interface IArticle {
    title: string;
    path: string;
}

const checkDaznChapter = (dazn: Cypress.Chainable<IDazn>, chapterPath: string) => {
    const chapter = dazn.its('chapterHistory.currentChapter');

    chapter.should('deep.equal', {
        chapterName: 'help',
        chapterPath,
    });
};

describe('FAQ Section - Article', () => {
    const articles: IArticle[] = [
        { title: 'About DAZN', path: 'about-dazn-de' },
        { title: 'Annual subscription FAQ', path: 'annual-subscription-dach' },
        { title: 'Company Information', path: 'company-information-de' },
        { title: 'Gift Code FAQ', path: 'gift-code-faq' },
        { title: 'How can I pay for DAZN?', path: 'how-can-i-pay-for-dazn' },
        { title: 'How do I cancel my subscription?', path: 'how-do-i-cancel-my-subscription' },
        {
            title: 'How do I display DAZN in my preferred language?',
            path: 'how-do-i-display-dazn-in-my-preferred-language',
        },
        { title: 'How do I sign up for DAZN?', path: 'how-do-i-sign-up' },
        { title: 'Price Change FAQ', path: 'price-change-faq-dach' },
        {
            title: 'Which devices are supported by DAZN?',
            path: 'which-devices-are-supported-by-dazn',
        },
    ];

    beforeEach(() => {
        cy.visitStory('sections-faq--faq');
    });

    it.each<IArticle>(articles)(
        (article) => `${article.title} points to help page ${article.path}`,
        (article) => {
            const element = cy.contains('[data-testid="FAQ_ARTICLE_TITLE"]', article.title);
            element.parent().click();

            const dazn = cy.window().its('dazn');
            checkDaznChapter(dazn, `en-de/help/articles/${article.path}`);
        },
    );
});

describe('FAQ Section - Fallback', () => {
    beforeEach(() => {
        cy.visitStory('sections-faq--faq&args=status:failed');
    });

    const articles = [
        { title: 'Getting Started', path: 'getting_started' },
        { title: 'Your DAZN Account', path: 'manage_my_account' },
        { title: 'Watching DAZN', path: 'watching_dazn' },
        { title: 'Payments & Billing', path: 'payment_and_billing' },
    ];

    it.each<IArticle>(articles)(
        (article) => `${article.title} points to help page ${article.path}`,
        (article) => {
            const element = cy.contains('[data-testid="FAQ_ARTICLE_TITLE"]', article.title);
            element.parent().click();

            const dazn = cy.window().its('dazn');
            checkDaznChapter(dazn, `help/categories/${article.path}`);
        },
    );
});
