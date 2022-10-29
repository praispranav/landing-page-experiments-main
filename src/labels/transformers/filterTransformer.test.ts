import { createLabels } from '@dazn/fe-labels';

import { applyFilterTransformer } from './filterTransformer';

describe('fe-labels: filterTransformer', () => {
    it('should filter resource strings with value matching its key', () => {
        const resourceStrings = {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            label_key: 'label_key',
        };

        const labels = createLabels({
            resourceStrings,
            transformers: [applyFilterTransformer(resourceStrings)],
        });

        expect(labels.get({ stringKey: 'label_key' })).toBe('');
    });

    it('should not filter resource strings with value different from its key', () => {
        const resourceStrings = {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            label_key: 'label key',
        };

        const labels = createLabels({
            resourceStrings,
            transformers: [applyFilterTransformer(resourceStrings)],
        });

        expect(labels.get({ stringKey: 'label_key' })).toBe('label key');
    });

    it('should not filter resource strings missing from the resource strings object', () => {
        const resourceStrings = {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            abcde: 'label key',
        };

        const labels = createLabels({
            resourceStrings,
            transformers: [applyFilterTransformer(resourceStrings)],
        });

        expect(labels.get({ stringKey: 'label_key' })).toBe('label_key');
    });
});
