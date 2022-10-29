import { ElementSettingKeys } from '@config/ConfigsKeys';
import { ILocalVariantConfig } from '@experiments/IVariantConfig';

import { WhatsOnVariantEnum } from '../Variants';

export const overrideVariantConfig =
    (whatsOnVariant: WhatsOnVariantEnum, railId?: string) =>
    (originalConfig: ILocalVariantConfig): ILocalVariantConfig => ({
        ...originalConfig,
        elements: {
            ...originalConfig.elements,
            [ElementSettingKeys.WhatsOnVariant]: whatsOnVariant,
            [ElementSettingKeys.RailId]: railId,
        },
    });
