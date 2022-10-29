import 'cypress-each';

import './assertions';
import './commands';
import './events';

Cypress.Screenshot.defaults({
    onBeforeScreenshot($el) {
        $el.css('overflow', 'hidden');
    },

    onAfterScreenshot($el, props) {
        $el.css('overflow', 'auto');
    },
});
