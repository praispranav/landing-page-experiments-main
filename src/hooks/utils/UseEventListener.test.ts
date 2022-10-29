import { fireEvent } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { useEventHandler, useEventListener } from './UseEventListener';

it('should handle a click event', () => {
    const mockEventHandler = jest.fn();

    renderHook(() => {
        const eventHandlerRef = useEventHandler<typeof mockEventHandler>(mockEventHandler);
        useEventListener(document, 'click', eventHandlerRef);
    });

    fireEvent(document, new Event('click'));

    expect(mockEventHandler).toBeCalled();
});
