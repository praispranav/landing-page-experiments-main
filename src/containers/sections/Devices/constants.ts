import { ResourceStringsKeys } from '@config/ConfigsKeys';

const {
    DevicesIconMobile,
    DevicesIconTv,
    DevicesIconWeb,
    DevicesIconConsole,
} = ResourceStringsKeys;

export type DevicesIconName = 'mobile' | 'tv' | 'laptop' | 'console';

export interface IDevicesIcon {
    name: DevicesIconName;
    title: ResourceStringsKeys;
}

export const DEVICES_ICONS: IDevicesIcon[] = [
    { name: 'mobile', title: DevicesIconMobile },
    { name: 'tv', title: DevicesIconTv },
    { name: 'laptop', title: DevicesIconWeb },
    { name: 'console', title: DevicesIconConsole },
];
