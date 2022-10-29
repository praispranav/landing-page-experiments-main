import { LabelProps, ResourceStrings, Transformer } from '@dazn/fe-labels';

export const applyFilterTransformer =
    (resourceStrings: ResourceStrings): Transformer =>
    (labelProps: LabelProps, value: string): string =>
        resourceStrings[labelProps.stringKey] === labelProps.stringKey ? '' : value;
