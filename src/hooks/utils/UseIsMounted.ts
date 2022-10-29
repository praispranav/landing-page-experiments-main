import { MutableRefObject, useEffect, useRef } from 'react';

export const useIsMounted = (): MutableRefObject<boolean> => {
    const isMounted = useRef(true);

    useEffect(
        () => (): void => {
            isMounted.current = false;
        },
        [],
    );

    return isMounted;
};
