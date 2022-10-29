import { MutableRefObject, useEffect, useRef } from 'react';

type EventCallback<H extends (...args: unknown[]) => unknown | null> = (
    ...args: unknown[]
) => ReturnType<H>;

type EventNames = keyof WindowEventMap | keyof ElementEventMap | keyof DocumentEventMap;

export const useEventListener = <H extends EventCallback<H>>(
    target: HTMLElement | Document | Window,
    eventName: EventNames,
    handler: MutableRefObject<H>,
): void => {
    useEffect(() => {
        const currentHandler = (...args: unknown[]): void => handler.current(...args);

        target.addEventListener(eventName, currentHandler);

        return (): void => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            target.removeEventListener(eventName, currentHandler);
        };
    }, [eventName, target, handler]);
};

export const useEventHandler = <H extends EventCallback<H>>(handler: H): MutableRefObject<H> => {
    const handlerRef = useRef<typeof handler | null>(null);
    handlerRef.current = handler;

    return handlerRef as MutableRefObject<H>;
};
