import addContext from 'mochawesome/addContext';

const getBreadcrumbs = (test: Mocha.Runnable | Mocha.Suite, titles: string[] = []) => {
    if (test.parent && test.parent.title) {
        titles = titles.concat(getBreadcrumbs(test.parent, titles));
    }

    titles = titles.concat(test.title);

    return titles;
};

Cypress.on('test:after:run', (test: Mocha.Runnable, runnable: Mocha.Runnable) => {
    const breadcrumbs = getBreadcrumbs(runnable).join(' -- ');

    const { ctx } = runnable;
    ctx.test = test;

    if (test.state === 'failed') {
        addContext(ctx, {
            title: 'How the error looked like',
            value: `assets/screenshots/${Cypress.spec.name}/${breadcrumbs} (failed).png`,
        });
    }
});
