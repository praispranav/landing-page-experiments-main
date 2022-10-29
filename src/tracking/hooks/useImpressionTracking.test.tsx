import { triggerLpElementVisibilityEvent } from '@dazn/fe-events';
import { act, renderHook } from '@testing-library/react-hooks';
import { ElementVisibilitySections } from '@tracking/events.types';

import * as useImpressionTracking from './useImpressionTracking';

jest.mock('@dazn/fe-events');

type Intersection = Record<'isIntersecting', boolean>;

describe('useImpressionTracking', () => {
    const mockIntersectionObserver = jest.fn();
    const mockObserve = jest.fn();
    const mockUnObserve = jest.fn();
    let triggerIntersection: (intersection: Intersection) => void;

    const visibilityThreshold = 0.5;
    let intersectionRatio: number;

    const elementHeight = 100;
    const htmlElement = document.createElement('div');
    htmlElement.style.height = `${elementHeight}`;

    Object.defineProperty(window, 'innerHeight', {
        value: 300,
        writable: true,
    });

    beforeEach(() => {
        Element.prototype.getBoundingClientRect = jest.fn(
            () =>
                ({
                    width: elementHeight,
                    height: elementHeight,
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                } as DOMRect),
        );

        mockIntersectionObserver.mockImplementation((callback) => {
            let _element: undefined;
            triggerIntersection = (entry: Intersection): void => {
                callback([{ target: _element, ...entry }]);
            };
            return {
                observe: mockObserve.mockImplementation((element) => {
                    _element = element;
                }),
                unobserve: mockUnObserve.mockImplementation(() => {
                    _element = undefined;
                }),
            };
        });

        window.IntersectionObserver = mockIntersectionObserver;
    });

    describe('useIsInViewport', () => {
        it('should call IntersectionObserver when useIsInViewport is called', () => {
            renderHook(() =>
                useImpressionTracking.useIsInViewport(htmlElement, visibilityThreshold),
            );

            expect(mockIntersectionObserver).toBeCalled();
        });

        it('should not call IntersectionObserver if it is not available', () => {
            jest.spyOn(useImpressionTracking, 'hasIntersectionObserver').mockReturnValue(false);
            renderHook(() =>
                useImpressionTracking.useIsInViewport(htmlElement, visibilityThreshold),
            );

            expect(mockIntersectionObserver).not.toBeCalled();
        });

        it('should observe the element when useIsInViewport is called', () => {
            renderHook(() =>
                useImpressionTracking.useIsInViewport(htmlElement, visibilityThreshold),
            );

            expect(mockObserve).toBeCalled();
        });

        it('should unobserve the element when the useIsInViewport is unmounted', () => {
            const { unmount } = renderHook(() =>
                useImpressionTracking.useIsInViewport(htmlElement, visibilityThreshold),
            );
            unmount();

            expect(mockUnObserve).toBeCalled();
        });

        it('should unobserve the element after the useIsInViewport returning true', () => {
            const { result } = renderHook(() =>
                useImpressionTracking.useIsInViewport(htmlElement, visibilityThreshold),
            );

            act(() => triggerIntersection({ isIntersecting: true }));

            expect(result.current).toBe(true);
            expect(mockUnObserve).toBeCalled();
        });

        it('should return true when the element intersectionRatio equal or more than the Treshold', () => {
            intersectionRatio = 1;

            const { result } = renderHook(() =>
                useImpressionTracking.useIsInViewport(htmlElement, visibilityThreshold),
            );

            act(() =>
                triggerIntersection({ isIntersecting: intersectionRatio >= visibilityThreshold }),
            );

            expect(result.current).toBe(true);
        });

        it('should return true when the element intersectionRatio less than the Treshold', () => {
            intersectionRatio = 0.4;

            const { result } = renderHook(() =>
                useImpressionTracking.useIsInViewport(htmlElement, visibilityThreshold),
            );

            act(() =>
                triggerIntersection({ isIntersecting: intersectionRatio >= visibilityThreshold }),
            );

            expect(result.current).toBe(false);
        });
    });

    describe('getThresholdRatio', () => {
        it('returns 1 if the element height less the window height', () => {
            const threshold = useImpressionTracking.getThresholdRatio(htmlElement);
            expect(threshold).toBe(0.5);
        });

        it('returns the ratio if the element height more the window height', () => {
            Object.defineProperty(window, 'innerHeight', {
                value: 40,
                writable: true,
            });
            const threshold = useImpressionTracking.getThresholdRatio(htmlElement);

            expect(threshold).toBe(0.4);
        });
    });

    describe('useImpressionTracking', () => {
        it('should trigger fe-events "triggerLpElementVisibilityEvent" when the element in the viewport', () => {
            jest.spyOn(useImpressionTracking, 'useIsInViewport').mockReturnValue(true);

            renderHook(() =>
                useImpressionTracking.useImpressionTracking(ElementVisibilitySections.Footer),
            );

            expect(triggerLpElementVisibilityEvent).toBeCalledWith({
                elementVisibility: {
                    type: 'footer',
                },
            });
        });

        it('should not trigger fe-events "triggerLpElementVisibilityEvent" when the element is not the viewport', () => {
            jest.spyOn(useImpressionTracking, 'useIsInViewport').mockReturnValue(false);

            renderHook(() =>
                useImpressionTracking.useImpressionTracking(ElementVisibilitySections.Footer),
            );

            expect(triggerLpElementVisibilityEvent).not.toBeCalled();
        });

        it('should return setTrackingRef', () => {
            jest.spyOn(useImpressionTracking, 'useIsInViewport').mockReturnValue(true);

            const {
                result: {
                    current: { setTrackingRef },
                },
            } = renderHook(() =>
                useImpressionTracking.useImpressionTracking(ElementVisibilitySections.Footer),
            );

            expect(setTrackingRef).toBeTruthy();
            expect(typeof setTrackingRef).toBe('function');
        });
    });
});
