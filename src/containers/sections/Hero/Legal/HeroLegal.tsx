import { ResourceStringsKeys } from '@config/ConfigsKeys';
import { Label } from '@dazn/fe-labels-react';
import { useResourceStringKey } from '@hooks/resourceStrings/UseLocalisedStrings';
import { FC } from 'react';

import { noteCopyStyle } from './HeroLegal.style';

export const HeroLegal: FC = () => {
    const legalKey = useResourceStringKey(ResourceStringsKeys.HeroLegalCopy);

    return <Label id="HERO_LEGAL_COPY" as="p" css={noteCopyStyle} stringKey={legalKey} />;
};
