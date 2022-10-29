import { ResourceStringsKeys } from '@config/ConfigsKeys';
import { Label } from '@dazn/fe-labels-react';
import { useResourceStringKey } from '@hooks/resourceStrings/UseLocalisedStrings';
import { FC } from 'react';

import { heroPPVTagStyle } from './HeroPPVTag.style';

export const HeroPPVTag: FC = () => (
    <Label id="HERO_PPV_TAG" as="div" stringKey={useResourceStringKey(ResourceStringsKeys.PPVlabel)} css={heroPPVTagStyle} />
);
