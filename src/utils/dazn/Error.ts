export const trackException = (error: Error): void => {
    window.dazn.captureException(error, {
        tags: {
            chapter: 'landingpage',
            type: 'experiments',
        },
    });
};
