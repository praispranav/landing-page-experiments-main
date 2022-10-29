import {
    createLabels,
    ExperimentsTransformerConfig,
    LabelsConfig,
    LabelsInstance,
    ResourceStrings,
    Transformer,
} from '@dazn/fe-labels';
import {
    ExperimentsResponse,
    useExperimentVariables,
} from '@hooks/dazn/experiments/useExperiments';
import { getResourcesDictionary } from '@utils/dazn/ResourcesDictionary';

import { applyFilterTransformer } from './transformers/filterTransformer';

const getVariationLabels = (
    resourceStrings: ResourceStrings,
    transformers: Transformer[],
    variationStrings: ExperimentsResponse['Experiments'],
): LabelsInstance => {
    const experimentsConfig: ExperimentsTransformerConfig = {
        variationStrings,
        getVariation: (experimentKey, { experimentAttributes }) =>
            window.dazn.experiment.getVariationAnonymous(experimentKey, experimentAttributes),
    };

    const handlers: LabelsConfig['handlers'] = {
        onVariationStringVisible: (labelProps) => {
            const { experimentKey, experimentAttributes } = labelProps;
            window.dazn.experiment.activateAnonymous(experimentKey, experimentAttributes);
        },
    };

    return createLabels({
        resourceStrings,
        transformers,
        experimentsConfig,
        handlers,
    });
};

export const useLabels = (): LabelsInstance => {
    const dictionary = getResourcesDictionary();

    const transformers = [applyFilterTransformer(dictionary.Strings)];
    const variationStrings = useExperimentVariables();

    if (!variationStrings) {
        return createLabels({
            resourceStrings: dictionary.Strings,
            transformers,
        });
    }

    return getVariationLabels(dictionary.Strings, transformers, variationStrings);
};
