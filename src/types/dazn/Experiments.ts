/* eslint-disable @typescript-eslint/ban-types */

type KeyAttributesMethod<T> = (key: string, attributes?: object) => T;
type GetVariable<T> = (featureKey: string, variableKey: string, attributes?: object) => T;

export interface FeaturesMethods {
    isEnabledAnonymous: KeyAttributesMethod<boolean>;
    isEnabledAuthenticated: KeyAttributesMethod<boolean>;
    getVariableStringAnonymous: GetVariable<string>;
    getVariableStringAuthenticated: GetVariable<string>;
    getVariableBooleanAnonymous: GetVariable<boolean>;
    getVariableBooleanAuthenticated: GetVariable<boolean>;
    getVariableIntegerAnonymous: GetVariable<number>;
    getVariableIntegerAuthenticated: GetVariable<number>;
}

export interface ExperimentMethods {
    trackAnonymous: KeyAttributesMethod<void>;
    trackAuthenticated: KeyAttributesMethod<void>;
    getVariationAnonymous: KeyAttributesMethod<string>;
    getVariationAuthenticated: KeyAttributesMethod<string>;
    activateAnonymous: KeyAttributesMethod<void>;
    activateAuthenticated: KeyAttributesMethod<void>;
}
