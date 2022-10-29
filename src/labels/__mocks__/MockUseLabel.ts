import { LabelProps } from "@dazn/fe-labels";
import { ResourceStringLabel } from "@hooks/resourceStrings/Types";
import { useLabelKey } from "@labels/labels";

import { resourceStringsData } from "../../../dev/mockResourceStringsData";

export const spyUseLabelResultFound = (): jest.SpyInstance =>
    (useLabelKey as jest.Mock).mockImplementation(({ stringKey }: LabelProps): string => {
        const { Strings } = resourceStringsData;
        const keys = Object.keys(Strings) as ResourceStringLabel[]
        const foundKey = keys.find((key) => key === stringKey)
        return foundKey ? Strings[foundKey] : ''
    });

export const spyUseLabelResultNotFound = (): jest.SpyInstance =>
    (useLabelKey as jest.Mock).mockImplementation(({ stringKey }: LabelProps): string => stringKey);
