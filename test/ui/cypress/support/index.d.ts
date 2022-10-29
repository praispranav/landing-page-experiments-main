import type { IDazn } from '../../../../src/types/dazn';

declare global {
    namespace Cypress {
        interface State {
            (property: 'document'): Document;
            (property: 'window'): Cypress.AUTWindow & { dazn: IDazn };
            (property: 'runnable'): any;
            // etc. etc.
            (property: string): any;
        }

        interface Chainable<Subject = any> {
            /**
             * This is NOT a custom command, this documents an internal method from Cypress
             * that grants access to Cypress' internal state
             *
             * @see https://github.com/cypress-io/cypress-documentation/pull/805
             * @example cy.state('window')
             */
            state: State;

            /**
             * Custom command to visit the storybook story by name
             * @example cy.visitStory('sections-sports--default-story')
             */
            visitStory(
                storyName: string,
                { withControls }?: { withControls: boolean },
            ): ReturnType<typeof cy.visit>;

            /**
             * Custom command to visit landing page on test environment
             * @example cy.visitExperimentWithDevPackage('en-DE')
             */
            visitExperimentWithDevPackage(region: string): ReturnType<typeof cy.visit>;

            /**
             * Custom command to select an element by its data-testid attribute
             * @example cy.getByTestId('SPORTS_SHOW_ALL')
             */
            getByTestId<E extends Node = HTMLElement>(
                testIdName: string,
                options?: Partial<Loggable & Timeoutable & Withinable & Shadow>,
            ): Chainable<JQuery<E>>;

            /**
             * Custom command to select an element by its data-testid attribute
             * @example cy.getByTestId('SPORTS_SHOW_ALL')
             */
             getById<E extends Node = HTMLElement>(
                idIdName: string,
                options?: Partial<Loggable & Timeoutable & Withinable & Shadow>,
            ): Chainable<JQuery<E>>;

            /**
             * Custom command to intercept a chapter being loaded by bootstrap
             * @example cy.interceptChapter('openbrowse')
             *
             * // Then you can wait for the chapter by following the format below:
             * // cy.wait('@openbrowse_chapter')
             *
             */
            interceptChapter(chapterName: string): ReturnType<typeof cy.intercept>;

            /**
             * Custom command that waits for the network activity to be idle
             * @example cy.waitForIdleNetwork()
             *
             * // Once all the requests cease, it will pass
             */
            waitForIdleNetwork(): Chainable;
            waitForIdleNetwork(options: { timeout: number }): Chainable;

            /**
             * Adds command "cy.waitForResources(name1, name2, ...)"
             * that checks performance entries for resources that end with the given names.
             * This command will be available in every spec file.
             *
             * @example cy.waitForResources(['base.css', 'app.css'])
             *
             * You can pass additional options, like "timeout"
             *
             * @example cy.waitForResources(['base.css', 'app.css'], { timeout: 3000 })
             */
            waitForResources(resources: string[]): Chainable;
            waitForResources(resources: string[], options: { timeout: number }): Chainable;

            /**
             * Custom command that gets an iframe
             * @example cy.getIframeDocument(iframeName)
             *
             * // Once all the requests cease, it will pass
             */
            getIframeDocument(): Chainable;
            getIframeDocument(iframeName: string): Chainable;

            /**
             * Custom command that takes iframe body
             * @example cy.getIframeBody(iframeName)
             */
            getIframeBody(): Chainable;
            getIframeBody(iframeName: string): Chainable;

            /**
             * Custom command that changes browser country
             * @example cy.setMarcoPoloCountry('NL', device);
             * Note, that you need to reload the page to have the country changed
             */
            setMarcoPoloCountry(country: string, device: any): Chainable;

            /**
             * Custom command that changes browser country
             * @example cy.enableMarcoPolo('NL');
             */
            enableMarcoPolo(country: string): void;

            /**
             * Custom command that fetches the Marco Polo secret from Vault
             * @example cy.getMarcoPoloToken();
             */
            getMarcoPoloToken(): Chainable<string>;

            /**
             * Custom command that gives consent to OneTrust
             * @example cy.givePrivacyConsent();
             */
            givePrivacyConsent(): Chainable;
        }

        interface Chainer<Subject = any> {
            /**
      * Custom Chai assertion that checks if given element is in viewport
      *
      * @example
      ```
      expect(cy.getByTestId('ABC')).to.be.inViewport()
      cy.wrap(cy.getByTestId('ABC')).should('be.inViewport')
      ```
      * */
            (chainer: 'be.inViewport'): Chainable;

            /**
      * Custom Chai assertion that checks if given element is NOT within the viewport
      *
      * @example
      ```
      expect(cy.getByTestId('ABC')).to.not.be.inViewport()
      cy.wrap(cy.getByTestId('ABC')).should('not.be.inViewport')
      ```
      * */
            (chainer: 'not.be.inViewport'): Chainable<Subject>;

            /**
     * Custom Chai assertion that checks if given element is covered by another
     *
     * @example
     ```
      expect(cy.getByTestId('ABC')).to.be.covered()
      cy.getByTestId('ABC').should('be.covered')
      ```
    * */
            (chainer: 'be.covered'): Chainable<Subject>;

            /**
     * Custom Chai assertion that checks if given element is NOT covered by another
     *
     * @example
     ```
      expect(cy.getByTestId('ABC')).to.be.covered()
      cy.getByTestId('ABC').should('be.covered')
      ```
    * */
            (chainer: 'not.be.covered'): Chainable<Subject>;
        }
    }
}
