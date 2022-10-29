import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60000,
            retry: 1,
        },
    },
});

export const QueryClientWrapper: FC = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
