import { ResourceStringsKeys } from '@config/ConfigsKeys';
import { Label } from '@dazn/fe-labels-react';
import { useResourceStringKey } from '@hooks/resourceStrings/UseLocalisedStrings';
import { useLabelKey } from '@labels/labels';
import { FC } from 'react';

import { leadStyle } from './HeroLead.style';

export const HeroLead: FC = () => {
    const leadKey = useResourceStringKey(ResourceStringsKeys.HeroDescription);
    const leadCopy = useLabelKey({ stringKey: leadKey });
    if (leadCopy === leadKey) {
        return null
    }

    return <Label id="HERO_DESCRIPTION" as="p" css={leadStyle} stringKey={leadKey} />;
};
