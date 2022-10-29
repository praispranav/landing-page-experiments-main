import { DaznEnvironmentKeys } from 'types/dazn/Environment';

import { getEnvironment } from './Environment';

describe('Environment', () => {
    test('should return the value set on dazn.environment', () => {
        const expectedEnvironment: DaznEnvironmentKeys = 'development';
        window.dazn.environment = expectedEnvironment;

        expect(getEnvironment()).toBe(expectedEnvironment);
    });
});
