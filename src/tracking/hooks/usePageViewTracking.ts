import { triggerVirtualPageViewEvent, VirtualPageViewEvent } from '@dazn/fe-events';
import { getCountry, getLanguage } from '@utils/dazn/Region';
import { useEffect } from 'react';

export const usePageViewTracking = (): void => {
    useEffect(() => {
        const event: VirtualPageViewEvent = {
            page: {
                category: 'landingpage',
                title: document.title,
                url: window.location.href,
                path: window.location.pathname,
                type: '',
                country: getCountry().toLocaleLowerCase(),
                language: getLanguage(),
            },
        };
        triggerVirtualPageViewEvent(event);
    }, []);
};
