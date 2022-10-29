export interface IDevMode {
    isDevModeEnabled: boolean;
    enable: () => void;
    disable: () => void;
}

export interface IDevice {
    guid: string;
    id: string;
    manufacturer: string;
    model: string;
    platform: 'web';
}
