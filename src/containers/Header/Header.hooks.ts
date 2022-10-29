import { useEventHandler, useEventListener } from '@hooks/utils/UseEventListener';
import { useCallback, useState } from 'react';

import { HeaderRef } from './Types';

export const useHasScrolledBelowFold = (headerRef: HeaderRef): boolean => {
    const [hasScrolledBelowFold, setScrolledBelowFold] = useState(false);

    const scrollHandlerCallback = useCallback((): void => {
        const sectionBoundaries = headerRef?.nextElementSibling?.getBoundingClientRect();

        if (!sectionBoundaries) {
            return;
        }

        const firstSectionHeight = sectionBoundaries.height;
        const scrollY = sectionBoundaries.top;
        const firstSectionScrollDiff = firstSectionHeight + scrollY;

        setScrolledBelowFold(firstSectionScrollDiff <= 0);
    }, [headerRef]);

    const scrollHandlerRef = useEventHandler(scrollHandlerCallback);

    useEventListener(document, 'scroll', scrollHandlerRef);

    return hasScrolledBelowFold;
};
