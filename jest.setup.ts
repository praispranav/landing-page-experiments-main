import '@testing-library/jest-dom';

import { matchers } from '@emotion/jest';

import { mockBootstrap } from './dev/mockBootstrap';

expect.extend(matchers);

import { TextDecoder, TextEncoder } from 'util';

global.TextEncoder = TextEncoder;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.TextDecoder = TextDecoder;

// eslint-disable-next-line accessor-pairs
Object.defineProperty(global.Image.prototype, 'src', {
    set() {
        setTimeout(() => this.onload());
    },
});

Object.defineProperty(global, 'location', {
    value: {
        assign: jest.fn(),
    },
    writable: true,
});

jest.mock('@dazn/discovery-web-module-bootstrap', () => ({
    ...jest.requireActual('@dazn/discovery-web-module-bootstrap'),
    getLanguage: jest.fn(),
    optimizely: {
        getVariableBoolean: jest.fn(),
        isFeatureEnabled: jest.fn(),
        track: jest.fn(),
    },
}))
    .mock('@dazn/discovery-web-module-utils')
    .mock('@dazn/discovery-web-module-components');

jest.mock('@hooks/resourceStrings/signup/UseSignupKey', () => ({
    useSignupKey: ({ ctaFreeTrialKey }: Record<string, string>): string => ctaFreeTrialKey,
}));

window.dazn = mockBootstrap;

window.dataLayer = window.dataLayer || [];

window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
}));
