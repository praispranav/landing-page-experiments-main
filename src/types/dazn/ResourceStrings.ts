import { ResourceStringLabel } from '@hooks/resourceStrings/Types';

interface IResouceStringsLink {
    Key: string;
    Value: string;
}

export interface IResourceStringsData {
    Links: IResouceStringsLink[];
    Metadata: Record<string, string>;
    Strings: Record<ResourceStringLabel, string>;
}
