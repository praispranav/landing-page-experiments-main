import { FC } from 'react';

import { gridStyle } from './Grid.style';

export const Grid: FC = ({ children }) => <div css={gridStyle}>{children}</div>;
