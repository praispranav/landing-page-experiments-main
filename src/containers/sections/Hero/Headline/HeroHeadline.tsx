import { ResourceStringsKeys } from '@config/ConfigsKeys';
import { Label } from '@dazn/fe-labels-react';
import { useResourceStringKey } from '@hooks/resourceStrings/UseLocalisedStrings';
import { FC } from 'react';

import { headlineStyle } from './HeroHeadline.style';

export const HeroHeadline: FC = () => {
    const titleKey = useResourceStringKey(ResourceStringsKeys.HeroTitle);

    return <Label id="HERO_TITLE" as="h3" css={headlineStyle} stringKey={titleKey} />;
};
