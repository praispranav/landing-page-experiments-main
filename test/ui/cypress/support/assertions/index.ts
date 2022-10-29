/* global chai */

/**
 * Custom Chai assertion that checks if given element is in viewport
 *
 * @example
 ```
expect(cy.getByTestId('ABC')).to.be.inViewport()
cy.getByTestId('ABC').should('be.inViewport')
```
* */
const isInViewport: Chai.ChaiPlugin = (_chai: Chai.ChaiStatic) => {
    function assertIsInViewport() {
        const subject = this._obj as HTMLElement[];

        const bottom = Cypress.$(cy.state('window')).height();
        const rect = subject[0].getBoundingClientRect();

        this.assert(
            rect.top < bottom && rect.bottom < bottom && rect.bottom > 0 && rect.top > 0,
            'expected #{this} to be in viewport',
            'expected #{this} to not be in viewport',
            this._obj,
        );
    }

    _chai.Assertion.addMethod('inViewport', assertIsInViewport);
};

/**
 * Custom Chai assertion that checks if given element is covered by another
 *
 * @example
 ```
  expect(cy.getByTestId('ABC')).to.be.covered()
  cy.getByTestId('ABC').should('be.covered')
  ```
* */
const isElementCovered: Chai.ChaiPlugin = (_chai: Chai.ChaiStatic) => {
    function assertIsElementCovered() {
        const subject = this._obj as HTMLElement[];
        const element = subject[0];

        const { left, top, right, bottom } = element.getBoundingClientRect();

        const x = left > 0 ? left + 1 : right - 1;
        const y = top > 0 ? top + 1 : bottom - 1;

        const document = cy.state('document');
        const topElement = document.elementFromPoint(x, y);

        const isCovered = !(element.isSameNode(topElement) || topElement.contains(element));

        this.assert(
            isCovered,
            'expected #{this} to be covered',
            'expected #{this} to not be covered',
            this._obj,
        );
    }

    _chai.Assertion.addMethod('covered', assertIsElementCovered);
};

chai.use(isInViewport);
chai.use(isElementCovered);
