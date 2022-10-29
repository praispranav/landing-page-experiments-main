export enum LogoSetType {
    DEFAULT = 'default',
    TIERING = 'entitlementSet',
}

type LogoImageType = 'auto' | 'jpg' | 'png' | 'webp';

export interface ILogoResponse {
    id: string;
    name: string;
    url: string;
}

export interface ISpoloData {
    countries: string[];
    description: string;
    id: string;
    type: LogoSetType;
    typeId?: string;
    logos: ILogoResponse[];
    name: string;
}

export interface ISpoloResponse {
    data: ISpoloData[];
}

interface ISpoloBaseRequest {
    path?: string;
    imageType?: LogoImageType;
    width?: string;
    height?: string;
}

interface ISpoloDefaultRequest extends ISpoloBaseRequest {
    type?: LogoSetType.DEFAULT;
    typeId?: never;
}

interface ISpoloTieringRequest extends ISpoloBaseRequest {
    type: LogoSetType.TIERING;
    typeId: string;
}

export type SpoloRequest = ISpoloDefaultRequest | ISpoloTieringRequest;
