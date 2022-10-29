import colors from '@components/Style/Colors';
import { gridMediaQuery } from '@components/Style/Grid';
import { css, SerializedStyles } from '@emotion/core';
import { transparentize } from 'polished';

export const logoSize = 32;

export const headerStyle: SerializedStyles = css(
    {
        background: colors.tarmac,
        display: 'flex',
        justifyContent: 'flex-end',
        top: 0,
        alignItems: 'center',
        zIndex: 1000,
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 12,
    },
    gridMediaQuery({
        position: ['static', 'sticky'],
        paddingRight: [12, 32],
    }),
);

export const logoStyle = css({
    width: logoSize,
    height: logoSize,
    marginRight: 'auto',
    cursor: 'pointer',
});

export const getHeaderSignupStyle = (): SerializedStyles =>
    css(
        {
            marginRight: '16px',
        },
        gridMediaQuery({
            display: ['none', 'flex'],
        }),
    );

export const getSignupBannerStyle = (hasScrolledBelowFold: boolean): SerializedStyles =>
    css(
        {
            width: '100%',
            position: 'fixed',
            padding: '16px 24px',
            bottom: hasScrolledBelowFold ? 0 : '-100%',
            left: 0,
            transition: 'bottom .5s ease-in-out',
            backgroundColor: transparentize(0.25, colors.tarmac),
            boxSizing: 'border-box',
            zIndex: 100,
        },
        gridMediaQuery({
            display: ['flex', 'none'],
        }),
    );
