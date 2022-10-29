import { bodyFontStyles } from '@components/Fonts/Typography.style';
import colors from '@components/Style/Colors';
import { gridMediaQuery } from '@components/Style/Grid';
import { css } from '@emotion/core';

export const chevronStyle = gridMediaQuery({
    transform: ['rotate(-90deg)', 'rotate(-90deg) scale(1.5)'],
});

const articlePadding = ['8px 16px 8px 8px', '16px 30px 16px 16px'];

export const articleStyle = gridMediaQuery({
    background: colors.ebony,
    padding: articlePadding,
    width: '100%',
    marginBottom: ['20px', '8px'],
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    boxSizing: 'border-box',

    '&:hover': {
        background: colors.mako,
        boxShadow: `5px 5px 25px 5px ${colors.ebony}`,
    },
});

export const titleStyle = css(bodyFontStyles.body1, {
    width: '100%',

    '& span': {
        display: 'flex',
        lineHeight: 1,
    },
});

export const skeletonStyle = css({
    opacity: 0.3,
});
