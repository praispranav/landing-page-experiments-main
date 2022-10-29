import { CaptureOptions } from 'raven';

export type DaznCaptureException = (error: Error, options?: CaptureOptions) => void;
