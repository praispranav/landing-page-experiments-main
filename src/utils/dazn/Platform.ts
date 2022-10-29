import { DaznPlatformKeys } from 'types/dazn/Platform';

export const getPlatform = (): DaznPlatformKeys => window.dazn.platform;
