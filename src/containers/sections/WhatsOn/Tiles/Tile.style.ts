import { ppvFontStyles } from '@components/Fonts/Typography.style';
import { css } from '@emotion/core';

export const ppvTag = css({
    position: 'absolute',
    bottom: '0',
    height: '28px',
    width: '100%',
    textAlign: 'center',
    background: `
        linear-gradient(
            270deg, rgba(7, 11, 15, 0.2) 0%,
            rgba(7, 11, 15, 0.8) 42.04%,
            rgba(7, 11, 15, 0.8) 56.58%,
            rgba(7, 11, 15, 0.2) 99.66%
        );
    `,
});

export const ppvTagBorder = css({
    height: '1px',
    background: `
        linear-gradient(
            270deg, rgba(196, 140, 9, 0) 0%,
            #FBED7D 50.51%, 
            rgba(196, 140, 9, 0) 99.97%
        );
    `,
});

export const ppvText = css(ppvFontStyles.small, {
    position: 'relative',
    margin: '6px 0px 5px',
});

export const subscribeNow = css({
    position: 'absolute',
    left: '8px',
    top: '8px',
});
