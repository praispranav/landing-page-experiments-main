import { Label } from '@components/Label/Label';
import { LabelColors, LabelSizes } from '@components/Label/types';
import { ElementSettingKeys, ResourceStringsKeys } from '@config/ConfigsKeys';
import { Label as FELabel } from '@dazn/fe-labels-react';
import { useResourceStringKey } from '@hooks/resourceStrings/UseLocalisedStrings';
import { useElementSetting } from '@hooks/utils/UseLocalisedConfig';
import { FC } from 'react';

import { announcementBannerStyle } from './AnnouncementBanner.style';

export const AnnouncementBanner: FC = () => {
    const announcementBannerText = useResourceStringKey(ResourceStringsKeys.AnnouncementBanner);
    const showAnnouncementBanner = useElementSetting(ElementSettingKeys.AnnouncementBanner);
    if (!showAnnouncementBanner) {
        return null
    }
    return (
        <Label size={LabelSizes.large} backgroundColor={LabelColors.chalk} data-testid="HERO_FULL_HD_TAG" css={announcementBannerStyle}>
            <FELabel
                as="span"
                stringKey={announcementBannerText}
            />
        </Label>
    );
};
