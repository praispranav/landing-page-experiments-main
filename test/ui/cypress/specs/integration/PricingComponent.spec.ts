describe('Pricing Section', () => {
    const locales = ['de-DE', 'ja-JP', 'ru-RU', 'en-CA', 'en-US', 'en-GB', 'pt-BR', 'nl-NL'];

    describe('Verify that', () => {
        const monthStoryName = 'sections-hero-offer-period-plans--only-monthly';
        const annualStoryName = 'sections-hero-offer-period-plans--only-annual';
        const monthlyAnnualStoryName = 'sections-hero-offer-period-plans--monthly-and-annual';
        const startingFromStoryName = 'sections-hero-offer-starting-from--starting-from';

        const fullPrice = '[data-testid="HERO_PRICE_FULL_VALUE"]';

        const monthPrices: { [key: string]: string } = {
            'de-DE': '10,99\u00a0€',
            'ja-JP': '11円',
            'ru-RU': '10,99\u00a0₽',
            'en-CA': '$10.99',
            'en-US': '$10.99',
            'en-GB': '£10.99',
            'pt-BR': 'R$\u00a010,99',
            'nl-NL': '€\u00a010,99',
        };
        const annualPrices: { [key: string]: string } = {
            'de-DE': '100,99\u00a0€',
            'ja-JP': '101円',
            'ru-RU': '100,99\u00a0₽',
            'en-CA': '$100.99',
            'en-US': '$100.99',
            'en-GB': '£100.99',
            'pt-BR': 'R$\u00a0100,99',
            'nl-NL': '€\u00a0100,99',
        };
        const startingFromPrices: { [key: string]: string } = {
            'de-DE': '30,99\u00a0€',
            'ja-JP': '31円',
            'ru-RU': '30,99\u00a0₽',
            'en-CA': '$30.99',
            'en-US': '$30.99',
            'en-GB': '£30.99',
            'pt-BR': 'R$\u00a030,99',
            'nl-NL': '€\u00a030,99',
        };

        locales.forEach((locale: string) => {
            it(`monthly price for ${locale} is ${monthPrices[locale]}`, () => {
                cy.visitStory(`${monthStoryName}&args=locale:${locale}`);

                cy.get(fullPrice).should('have.text', monthPrices[locale]);
            });
        });

        locales.forEach((locale: string) => {
            it(`annual price for ${locale} is ${annualPrices[locale]}`, () => {
                cy.visitStory(`${annualStoryName}&args=locale:${locale}`);

                cy.get(fullPrice).should('have.text', annualPrices[locale]);
            });
        });

        locales.forEach((locale: string) => {
            it(`annual price for ${locale} is ${annualPrices[locale]} and monthly price is ${monthPrices[locale]}`, () => {
                cy.visitStory(`${monthlyAnnualStoryName}&args=locale:${locale}`);

                const annualPrice = '[data-testid="HERO_PRICE_ANNUAL"]';
                const monthPrice = '[data-testid="HERO_PRICE_MONTH"]';

                cy.get(annualPrice).find(fullPrice).should('have.text', annualPrices[locale]);
                cy.get(monthPrice).find(fullPrice).should('have.text', monthPrices[locale]);
            });
        });

        locales.forEach((locale: string) => {
            it(`starting from price for ${locale} is ${startingFromPrices[locale]}`, () => {
                cy.visitStory(`${startingFromStoryName}&args=locale:${locale}`);

                cy.get(fullPrice).should('have.text', startingFromPrices[locale]);
            });
        });
    });
});
