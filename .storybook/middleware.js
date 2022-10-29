const proxy = require('http-proxy-middleware');

const expressMiddleware = (router) => {
    const filter = (pathname) => !pathname.includes('/error');

    const chaptersProxy = proxy(filter, {
        target: 'https://www.edge.indaznlab.com',
        changeOrigin: true,
        secure: false,
    });

    router.use('/chapters', chaptersProxy);
};

module.exports = expressMiddleware;
