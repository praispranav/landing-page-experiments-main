import { QueryClientWrapper } from '@config/QueryClient';
import { GlobalStyle, ThemeProvider, themes } from '@dazn/lp-content-blocks';
import { FC } from 'react';

import { AppErrorBoundary } from './AppErrorBoundary';

export const AppWrapper: FC = ({ children }) => (
    <AppErrorBoundary>
        <ThemeProvider theme={themes.darkTheme}>
            <GlobalStyle backgroundColor="BACKGROUND" color="NEUTRAL_TEXT" fontFamily="PRIMARY" />
            <QueryClientWrapper>{children}</QueryClientWrapper>
        </ThemeProvider>
    </AppErrorBoundary>
);
