import { LabelProps } from '@dazn/fe-labels';
import { LabelsContext, LabelsProvider } from '@dazn/fe-labels-react';
import { FC, useContext } from 'react';

import { useLabels } from './labels.hooks';

export const useLabelKey = (labelsProps: LabelProps): string => {
    const { labels } = useContext(LabelsContext);
    return labels.get(labelsProps);
};

export const FELabelsProvider: FC = ({ children }) => {
    const labels = useLabels();

    return <LabelsProvider value={{ labels }}>{children}</LabelsProvider>;
};
