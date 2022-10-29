import { ElementSettingKeys, ResourceStringsKeys } from '@config/ConfigsKeys';
import { Label } from '@dazn/fe-labels-react';
import { useResourceStringKey } from '@hooks/resourceStrings/UseLocalisedStrings';
import { useElementSetting } from '@hooks/utils/UseLocalisedConfig';
import { useLabelKey } from '@labels/labels';
import { FC } from 'react';

import { detailsStyle } from './HeroDetails.style';

export const HeroDetails: FC<{ details?: string }> = ({ details = '' }) => {
    const detailsKey = useResourceStringKey(ResourceStringsKeys.HeroDetails);
    const detailsCopy = useLabelKey({ stringKey: detailsKey });
    const showHeroDetails = useElementSetting(ElementSettingKeys.HeroDetails);

    if (detailsKey === detailsCopy || !showHeroDetails) {
        return null;
    }

    return (
        <Label
            id="HERO_DETAILS"
            as="p"
            stringKey={detailsKey}
            css={detailsStyle}
            variables={{ details }}
        />
    );
};
