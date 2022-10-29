/* eslint-disable @typescript-eslint/ban-types */
import { IChapterHistory } from './ChapterHistory';
import { DaznEnvironmentKeys } from './Environment';
import { DaznCaptureException } from './Error';
import { ExperimentFeatures, ExperimentMethods } from './Experiments';
import { IDevice, IDevMode } from './MarcoPolo';
import { DaznPlatformKeys } from './Platform';
import { IResourceStringsData } from './ResourceStrings';
import { IStartupData } from './StartupData';

export interface IDazn {
    captureException: DaznCaptureException;
    platform: DaznPlatformKeys;
    environment: DaznEnvironmentKeys;
    chapterHistory: IChapterHistory;
    resourceStringsData: IResourceStringsData | Promise<IResourceStringsData>;
    startupData: IStartupData;
    device: IDevice;
    deviceId: string;
    devMode: IDevMode;
    language: string;
    features: ExperimentFeatures;
    lifecycle: { onChapterUnload: (fn: () => Promise<void>) => void };
    experiment: ExperimentMethods;
}

declare global {
    interface Window {
        dazn: IDazn;
    }
}
