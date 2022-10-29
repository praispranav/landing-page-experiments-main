import { gridMediaQuery } from '@components/Style/Grid';
import css from '@emotion/css';

export const addonsStyle = css(
    {
        display: 'flex',
        flexDirection: 'row-reverse',
    },
    gridMediaQuery({
        flexFlow: ['column', 'row'],
        '& > div:first-child': {
            order: [0, 1],
        },
    }),
);
