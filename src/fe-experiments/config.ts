/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable id-length */
import { configure } from '@dazn/fe-experiments';

configure({
    isEnabledAnonymous(featureKey: string, attributes: object) {
        return window.dazn.features.isEnabledAnonymous(featureKey, attributes);
    },
    isEnabledAuthenticated(featureKey: string, attributes: object) {
        return window.dazn.features.isEnabledAuthenticated(featureKey, attributes);
    },
    getVariableStringAnonymous(featureKey: string, variableKey: string, attributes: object) {
        return window.dazn.features.getVariableStringAnonymous(featureKey, variableKey, attributes);
    },
    getVariableStringAuthenticated(featureKey: string, variableKey: string, attributes: object) {
        return window.dazn.features.getVariableStringAuthenticated(
            featureKey,
            variableKey,
            attributes,
        );
    },
    getVariableIntegerAnonymous(featureKey: string, variableKey: string, attributes: object) {
        return window.dazn.features.getVariableIntegerAnonymous(
            featureKey,
            variableKey,
            attributes,
        );
    },
    getVariableIntegerAuthenticated(featureKey: string, variableKey: string, attributes: object) {
        return window.dazn.features.getVariableIntegerAuthenticated(
            featureKey,
            variableKey,
            attributes,
        );
    },
    getVariableBooleanAnonymous(featureKey: string, variableKey: string, attributes: object) {
        return window.dazn.features.getVariableBooleanAnonymous(
            featureKey,
            variableKey,
            attributes,
        );
    },
    getVariableBooleanAuthenticated(featureKey: string, variableKey: string, attributes: object) {
        return window.dazn.features.getVariableBooleanAuthenticated(
            featureKey,
            variableKey,
            attributes,
        );
    },
    activateAnonymous(featureKey: string, attributes: object) {
        return window.dazn.experiment.activateAnonymous(featureKey, attributes);
    },
    activateAuthenticated(experimentKey: string, attributes: object): void {
        return window.dazn.experiment.activateAuthenticated(experimentKey, attributes);
    },
    getVariationAnonymous(featureKey: string, attributes: object) {
        return window.dazn.experiment.getVariationAnonymous(featureKey, attributes);
    },
    getVariationAuthenticated(experimentKey: string, attributes: object): string {
        return window.dazn.experiment.getVariationAuthenticated(experimentKey, attributes);
    },
    trackAnonymous(eventKey: string, attributes: object): void {
        return window.dazn.experiment.trackAnonymous(eventKey, attributes);
    },
    trackAuthenticated(eventKey: string, attributes: object): void {
        return window.dazn.experiment.trackAuthenticated(eventKey, attributes);
    },
});
