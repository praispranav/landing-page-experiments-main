import { fonts } from '@dazn/goat-design-system/lib/cjs/themes/core/fonts';
import { css, SerializedStyles } from '@emotion/core';

export const subtitleStyle = css({
    fontSize: '14px',
    fontFamily: fonts.PRIMARY.fontFamily,
    textTransform: 'capitalize',
});

export const titleStyle = css({
    fontWeight: 'bold',
    fontFamily: fonts.PRIMARY.fontFamily,
    fontSize: '16px',
});

export const tileFooterStyle = css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: '10px',
});

export const imageStyle = css({
    position: 'absolute',
    height: '100%',
    width: '100%',
    left: '0px',
    top: '0px',
});

export const contentOverlay = css({
    background: 'linear-gradient(180deg, rgba(12, 22, 28, 0.29) 12.5%, #0C161C 96.35%);',
    width: '100%',
    height: '100%',
    position: 'absolute',
});

export const pictureStyle = css({
    display: 'flex',
    position: 'relative',
    padding: '0px 0px 53.475%',
});

export const getTileStyle = ({ width }: { width?: number }): SerializedStyles => css`
    display: block;
    width: ${width ? `${width}px` : 'auto'};
    margin-right: 16px;
    margin-bottom: 16px;
`;
