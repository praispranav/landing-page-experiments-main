import { headerFontStyles, headerStrongFontStyles } from '@components/Fonts/Typography.style';
import { gridMediaQuery } from '@components/Style/Grid';
import { css } from '@emotion/react';

export const signupStyle = gridMediaQuery({
    alignSelf: 'baseline',
});

export const priceValueStyle = gridMediaQuery(headerStrongFontStyles.strongH4, {
    margin: '16px 0 0',

    '& + *': {
        marginTop: '16px',
    },
});

export const priceLabelStyle = css(headerFontStyles.header6, { margin: 0 });

export const priceContainerStyle = gridMediaQuery({
    display: 'flex',
    flexFlow: 'column',
    marginRight: [0, 96],

    // All first descendants expect first to simulate gap (flex items)
    '& > *:first-child': {
        marginTop: '0',
    },
    '& > *': {
        marginTop: '16px',
    },

    '&:nth-of-type(2)': {
        marginTop: [64, 0],
    },
});

export const pricesStyle = gridMediaQuery({
    display: 'flex',
    flexFlow: ['column', 'row'],
});
