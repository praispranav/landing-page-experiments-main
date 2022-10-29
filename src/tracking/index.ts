import {
    addEventListener,
    ElementClickEvent,
    ErrorTypeFragment,
    EventType,
    triggerElementClickEvent,
    triggerErrorImpressionEvent,
} from '@dazn/fe-events';
import { DaznError } from '@utils/dazn/DaznError';

import { IElementClick, IEventMeta } from './events.types';

export const callbackListener = (payload: EventType, meta: IEventMeta): void => {
    if (meta?.deprecated || !meta?.gtm) {
        return;
    }

    if (!window.dataLayer) {
        window.dataLayer = [];
    }

    window.dataLayer.push({
        ...payload,
        event: meta.name,
    });
};

export const unsubscribeEvents = addEventListener(callbackListener);

export const triggerElementClick = ({
    section,
    itemId = '',
    resourceString,
}: IElementClick): void => {
    const event: ElementClickEvent = {
        element: {
            type: section,
            itemType: 'element',
            itemId,
            itemName: resourceString,
        },
    };

    triggerElementClickEvent(event);
};

export const triggerErrorImpression = (type: ErrorTypeFragment, error?: DaznError | null): void => {
    if (error) {
        triggerErrorImpressionEvent({
            error: {
                itemType: 'error',
                type,
                itemId: error.errorCode,
            },
        });
    }
};
