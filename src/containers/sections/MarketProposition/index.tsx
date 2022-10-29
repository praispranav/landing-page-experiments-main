import { ElementSettingKeys } from '@config/ConfigsKeys';
import { useElementSetting } from '@hooks/utils/UseLocalisedConfig';
import React, { FC, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const MarketPropositionFallback: FC = () => <div data-testid="MARKET_PROPOSITION_FALLBACK" />;

const MarketPropositionLazy = React.lazy(() =>
    import(
        /* webpackChunkName: "lazy-MarketProposition" */
        './MarketProposition'
    ).then((module) => ({ default: module.MarketProposition })),
);

export const MarketProposition: FC = () => {
    const variant = useElementSetting(ElementSettingKeys.MarketPropositionSection);

    return (
        <ErrorBoundary fallback={<MarketPropositionFallback />}>
            <Suspense fallback={null}>{variant ? <MarketPropositionLazy /> : null}</Suspense>
        </ErrorBoundary>
    );
};
