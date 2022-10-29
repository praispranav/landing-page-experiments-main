/* eslint-disable prefer-destructuring */
/* eslint-disable id-length */
import { configure } from '@dazn/fe-experiments';
import { IDazn } from 'types/dazn';
jest.mock('@dazn/fe-experiments');

describe('fe-experiments configure', () => {
    window.dazn = {
        features: {
            isEnabledAnonymous: jest.fn(),
            isEnabledAuthenticated: jest.fn(),
            getVariableStringAnonymous: jest.fn(),
            getVariableStringAuthenticated: jest.fn(),
            getVariableIntegerAnonymous: jest.fn(),
            getVariableIntegerAuthenticated: jest.fn(),
            getVariableBooleanAnonymous: jest.fn(),
            getVariableBooleanAuthenticated: jest.fn(),
        },
        experiment: {
            activateAnonymous: jest.fn(),
            activateAuthenticated: jest.fn(),
            getVariationAnonymous: jest.fn(),
            getVariationAuthenticated: jest.fn(),
            trackAnonymous: jest.fn(),
            trackAuthenticated: jest.fn(),
        },
    } as unknown as IDazn;

    beforeEach(() => {
        jest.isolateModules(() => {
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            require('./config');
        });
    });

    it('should configure experiments', () => {
        expect(configure as jest.Mock).toHaveBeenCalled();
    });

    it('calls the feature methods correctly', () => {
        const {
            isEnabledAnonymous,
            isEnabledAuthenticated,
            getVariableStringAnonymous,
            getVariableStringAuthenticated,
            getVariableIntegerAnonymous,
            getVariableIntegerAuthenticated,
            getVariableBooleanAnonymous,
            getVariableBooleanAuthenticated,
        } = (configure as jest.Mock).mock.calls[0][0];

        isEnabledAnonymous('feature', 'key');
        expect(window.dazn.features.isEnabledAnonymous).toBeCalledWith('feature', 'key');

        isEnabledAuthenticated('feature', 'key');
        expect(window.dazn.features.isEnabledAuthenticated).toBeCalledWith('feature', 'key');

        getVariableStringAnonymous('feature', 'key', 'attributes');
        expect(window.dazn.features.getVariableStringAnonymous).toBeCalledWith(
            'feature',
            'key',
            'attributes',
        );

        getVariableStringAuthenticated('feature', 'key', 'attributes');
        expect(window.dazn.features.getVariableStringAuthenticated).toBeCalledWith(
            'feature',
            'key',
            'attributes',
        );

        getVariableIntegerAnonymous('feature', 'key', 'attributes');
        expect(window.dazn.features.getVariableIntegerAnonymous).toBeCalledWith(
            'feature',
            'key',
            'attributes',
        );

        getVariableIntegerAuthenticated('feature', 'key');
        expect(window.dazn.features.isEnabledAnonymous).toBeCalledWith('feature', 'key');

        getVariableBooleanAnonymous('feature', 'key');
        expect(window.dazn.features.isEnabledAnonymous).toBeCalledWith('feature', 'key');

        getVariableBooleanAuthenticated('feature', 'key');
        expect(window.dazn.features.isEnabledAnonymous).toBeCalledWith('feature', 'key');
    });

    it('calls the experiment methods correctly', () => {
        const {
            activateAnonymous,
            activateAuthenticated,
            getVariationAnonymous,
            getVariationAuthenticated,
            trackAnonymous,
            trackAuthenticated,
        } = (configure as jest.Mock).mock.calls[0][0];

        activateAnonymous('feature', 'key');
        expect(window.dazn.experiment.activateAnonymous).toBeCalledWith('feature', 'key');

        activateAuthenticated('feature', 'key');
        expect(window.dazn.experiment.activateAuthenticated).toBeCalledWith('feature', 'key');

        getVariationAnonymous('feature', 'key');
        expect(window.dazn.experiment.getVariationAnonymous).toBeCalledWith('feature', 'key');

        getVariationAuthenticated('feature', 'key');
        expect(window.dazn.experiment.getVariationAuthenticated).toBeCalledWith('feature', 'key');

        trackAnonymous('feature', 'key');
        expect(window.dazn.experiment.trackAnonymous).toBeCalledWith('feature', 'key');

        trackAuthenticated('feature', 'key');
        expect(window.dazn.experiment.trackAuthenticated).toBeCalledWith('feature', 'key');
    });
});
