import React from 'react';

export const LazyEpg = React.lazy(
    () =>
        import(
            /* webpackChunkName: "lazy-epg" */
            './Epg'
        ),
);

export const LazyComingUp = React.lazy(
    () =>
        import(
            /* webpackChunkName: "lazy-comingup" */
            './ComingUp'
        ),
);

export const LazyNextUp = React.lazy(
    () =>
        import(
            /* webpackChunkName: "lazy-NextUp" */
            './NextUp'
        ),
);

export enum WhatsOnVariantEnum {
    Epg = 'Epg',
    ComingUp = 'ComingUp',
    NextUp = 'NextUp',
}
