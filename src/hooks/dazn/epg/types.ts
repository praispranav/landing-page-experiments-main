import { RailTile } from "types/dazn/Rail/Rail";

export interface IEpgResponse {
    Date: string;
    Generated: string;
    Id: string;
    LinearOnly: boolean;
    Tiles: RailTile[];
}

export interface IEpgQuery extends Record<string, string> {
    $format: 'json';
    date: string;
    country: string;
    languageCode: string;
}

export type IEpgQueryWithFilters = IEpgQuery & { filters: string };
