import xhrMock, { proxy } from 'xhr-mock';
import { Mock } from 'xhr-mock/lib/types';

export interface IMock {
    method: string;
    url: string | RegExp;
    response: Mock;
}

const applyMocks = (mocks: IMock[]): void => {
    mocks.forEach(({ method, url, response }) => {
        xhrMock.use(method, url, response);
    });
};

export const useXhrMocks = (mocks: IMock[]): void => {
    xhrMock.reset();
    xhrMock.setup();
    applyMocks(mocks);
    xhrMock.use(proxy);
};
