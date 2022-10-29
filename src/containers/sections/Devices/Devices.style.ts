import { bodyFontStyles, headerStrongFontStyles } from '@components/Fonts/Typography.style';
import { gridMediaQuery } from '@components/Style/Grid';
import { mqStylesCombiner } from '@components/Style/MqStylesCombiner';
import { css } from '@emotion/core';

export const contentStyle = css(
    {
        whiteSpace: 'pre-wrap',
    },
    gridMediaQuery({
        gridColumnStart: 1,
        gridColumnEnd: ['-1', '6', '8', '9'],
    }),
);

export const titleStyle = mqStylesCombiner([
    css(headerStrongFontStyles.strongH4, { margin: 0 }),
    headerStrongFontStyles.strongH3,
]);

export const subtitleStyle = css(
    bodyFontStyles.bodyRegular1,
    gridMediaQuery({
        marginTop: [16, 32],
        marginBottom: [32, 40],
    }),
);

export const buttonStyle = gridMediaQuery({
    gridColumnStart: 1,
    gridColumnEnd: -1,
});
