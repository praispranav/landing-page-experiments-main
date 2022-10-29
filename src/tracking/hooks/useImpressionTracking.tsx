import { triggerLpElementVisibilityEvent } from '@dazn/fe-events';
import {
    ElementVisibilitySections,
    HtmlElement,
    UseImpressionTracking,
} from '@tracking/events.types';
import { useEffect, useMemo, useState } from 'react';

export const hasIntersectionObserver = (): boolean => {
    if (typeof window === 'undefined') {
        return false;
    }

    return 'IntersectionObserver' in window;
};

export const useIsInViewport = (element: HtmlElement, threshold: number): boolean => {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const shouldUseObserver = hasIntersectionObserver();

    const observer = useMemo(
        () =>
            shouldUseObserver
                ? new IntersectionObserver(
                      ([entry]) => {
                          setIsIntersecting(entry.isIntersecting);
                      },
                      { threshold },
                  )
                : null,
        [shouldUseObserver, threshold],
    );

    useEffect(() => {
        if (element) {
            observer?.observe(element);
        }

        return (): void => {
            if (element) {
                observer?.unobserve(element);
            }
        };
    }, [element, observer]);

    if (isIntersecting && element) {
        observer?.unobserve(element);
    }

    return isIntersecting;
};

export const getThresholdRatio = (element: HtmlElement): number => {
    const elementHeight = element?.getBoundingClientRect()?.height || 1;
    const windowElementRatio = window.innerHeight / elementHeight;
    const defaultRatio = 0.5;

    return Math.min(windowElementRatio, defaultRatio);
};

export const useImpressionTracking = (
    sectionName: ElementVisibilitySections,
): UseImpressionTracking => {
    const [elementRef, setElementRef] = useState<HTMLElement | null>();

    const threshold = useMemo(() => getThresholdRatio(elementRef), [elementRef]);

    const isInViewport = useIsInViewport(elementRef, threshold);
    const [hasVisibilityTriggered, setHasVisibilityTriggered] = useState(false);

    useEffect(() => {
        if (isInViewport && !hasVisibilityTriggered) {
            triggerLpElementVisibilityEvent({
                elementVisibility: {
                    type: sectionName,
                },
            });
            setHasVisibilityTriggered(true);
        }
    }, [elementRef, hasVisibilityTriggered, isInViewport, sectionName]);

    return { setTrackingRef: setElementRef };
};
