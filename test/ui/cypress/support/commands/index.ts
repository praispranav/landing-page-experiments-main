import './Dom';
import './MarcoPolo';
import './Screenshots';
import './Privacy';
import './Navigation';
import './Network';

// returning false here prevents Cypress from
// failing the test in case of an uncaught exception
Cypress.on('uncaught:exception', () => false);

declare global {
    type RequestIdleCallbackHandle = any;
    type RequestIdleCallbackOptions = {
        timeout: number;
    };
    type RequestIdleCallbackDeadline = {
        readonly didTimeout: boolean;
        timeRemaining: () => number;
    };

    interface Window {
        requestIdleCallback: (
            callback: (deadline: RequestIdleCallbackDeadline) => void,
            opts?: RequestIdleCallbackOptions,
        ) => RequestIdleCallbackHandle;

        cancelIdleCallback: (handle: RequestIdleCallbackHandle) => void;
    }
}