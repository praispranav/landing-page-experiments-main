import { css } from '@emotion/core';
import { CSSInterpolation } from '@emotion/serialize';

export const scrollbarStyle: CSSInterpolation = css({
    'div::-webkit-scrollbar': {
        display: 'none',
      },
    div: {
        scrollbarWidth: 'none',
      },
});
