import { bodyFontStyles } from '@components/Fonts/Typography.style';
import { gridMediaQuery } from '@components/Style/Grid';
import { css } from '@emotion/core';

export const devicesIconsContainer = gridMediaQuery({
    gridColumnStart: ['1', '6', '8', '9'],
    gridColumnEnd: -1,
    padding: ['0px', '0px', '0px', '0px 0px 0px 32px'],
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    maxWidth: '720px',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    marginBottom: ['40px', '0px'],
});

export const devicesIcon = gridMediaQuery({
    height: 'auto',
    textAlign: 'center',
    flexBasis: ['45px', '50%', '50%', '25%'],
});

export const iconStyle = gridMediaQuery({
    marginBottom: ['0px', '20px', '20px', '40px'],
    height: 45,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

export const iconsTextStyle = css(
    bodyFontStyles.body1,
    gridMediaQuery({
        display: ['none', 'block'],
        margin: 0,
    }),
);
