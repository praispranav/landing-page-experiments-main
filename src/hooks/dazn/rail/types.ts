import { RailResponse } from "types/dazn/Rail/Rail";

export interface IRailHookRail {
    id: string;
    params: string | IRailHookRailParams;
}

export interface IRailHookRailParams {
    PageType: string;
    ContentType: string;
    ContentId?: string;
}

export type IRailHookResult = Pick<RailResponse, 'Tiles' | 'Title'>;
