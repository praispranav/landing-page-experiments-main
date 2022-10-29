import { renderHook } from '@testing-library/react-hooks';

import { useIsMounted } from './UseIsMounted';

it('should set the reference as cancelled when unmounted', () => {
    const {
        result: { current: isMounted },
        unmount,
    } = renderHook(() => useIsMounted());

    expect(isMounted.current).toBeTruthy();
    unmount();
    expect(isMounted.current).toBeFalsy();
});
