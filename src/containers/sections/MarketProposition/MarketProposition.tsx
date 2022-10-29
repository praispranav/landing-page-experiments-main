import { ResourceStringsKeys } from '@config/ConfigsKeys';
import { MarketProposition as MarketPropositionComponent } from '@dazn/lp-content-blocks';
import {
    useLocalisedStringKey,
    useResourceStringKey,
} from '@hooks/resourceStrings/UseLocalisedStrings';
import { ElementSection, ElementVisibilitySections } from '@tracking/events.types';
import { useImpressionTracking } from '@tracking/hooks/useImpressionTracking';
import { triggerElementClick } from '@tracking/index';
import { FC, MouseEventHandler, useCallback } from 'react';

import { useHighlights } from './MarketProposition.hooks';
import { scrollbarStyle } from './MarketProposition.style';

export const MarketProposition: FC = () => {
    const { setTrackingRef } = useImpressionTracking(ElementVisibilitySections.MarketProposition);
    const buttonKey = useResourceStringKey(ResourceStringsKeys.MarketPropositionCta);
    const buttonLabel = useLocalisedStringKey(ResourceStringsKeys.MarketPropositionCta);

    const href = 'https://www.dazn.com/account/payment-plan';
    const handleCTAClick = useCallback<MouseEventHandler<HTMLElement>>(() => {
        triggerElementClick({
            section: ElementSection.Body,
            itemId: buttonKey,
            resourceString: buttonLabel,
        });
    }, [buttonKey, buttonLabel]);

    const highlights = useHighlights();

    return (
        <div css={scrollbarStyle} ref={setTrackingRef} data-testid="MARKET_PROPOSITION_SECTION">
            <MarketPropositionComponent
                headline={useLocalisedStringKey(ResourceStringsKeys.MarketPropositionHeading)}
                subtitle={useLocalisedStringKey(ResourceStringsKeys.MarketPropositionDescription)}
                cards={highlights}
                onCTAClick={handleCTAClick}
                button={{
                    href,
                    label: buttonLabel,
                }}
            />
        </div>
    );
};
