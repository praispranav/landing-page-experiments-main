import { Icon } from '@components/Icons/Icon';
import { ResourceStringsKeys } from '@config/ConfigsKeys';
import { useLocalisedStringKey } from '@hooks/resourceStrings/UseLocalisedStrings';
import { FC } from 'react';

import { DevicesIconName, IDevicesIcon } from '../constants';
import {
    devicesIcon,
    devicesIconsContainer,
    iconsTextStyle,
    iconStyle,
} from './DevicesIcons.style';

const DeviceIcon: FC<{ name: DevicesIconName; title: ResourceStringsKeys }> = ({ name, title }) => (
    <div css={devicesIcon}>
        <div css={iconStyle}>
            <Icon name={name} />
        </div>
        <p css={iconsTextStyle}>{useLocalisedStringKey(title)}</p>
    </div>
);

export const DevicesIcons: FC<{ icons: IDevicesIcon[] }> = ({ icons }) => (
    <div css={devicesIconsContainer}>
        {icons.map(({ name, title }) => (
            <DeviceIcon key={name} name={name} title={title} />
        ))}
    </div>
);
