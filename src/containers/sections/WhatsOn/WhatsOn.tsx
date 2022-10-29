import { ThemeEnum } from '@components/Style/Theme';
import { ElementSettingKeys, ResourceStringsKeys } from '@config/ConfigsKeys';
import { useLocalisedStringKey } from '@hooks/resourceStrings/UseLocalisedStrings';
import { useElementSetting } from '@hooks/utils/UseLocalisedConfig';
import React, { FC, Suspense } from 'react';

import { Base } from '../Base/Base';
import { ThemeColour } from './Epg/Epg.styles';
import { LazyComingUp, LazyEpg, LazyNextUp, WhatsOnVariantEnum } from './Variants';
import { containerStyle, titleStyle } from './WhatsOn.style';

interface LazyEpgComponentProps {
    theme: ThemeColour;
}
interface LazyNextUpComponentProps {
    railId: string;
}

type WhatsOnBodyComponent = FC<LazyEpgComponentProps> | FC<LazyNextUpComponentProps> | FC;

const WhatsOnBodyMap: Record<WhatsOnVariantEnum, WhatsOnBodyComponent> = {
    [WhatsOnVariantEnum.ComingUp]: () => <LazyComingUp />,
    [WhatsOnVariantEnum.Epg]: (props: LazyEpgComponentProps) => <LazyEpg {...props} />,
    [WhatsOnVariantEnum.NextUp]: (props: LazyNextUpComponentProps) => <LazyNextUp {...props} />,
};

const WhatsOnBody: FC<{ theme: ThemeColour }> = ({ theme }) => {
    const variant = useElementSetting(ElementSettingKeys.WhatsOnVariant);
    const railId = useElementSetting(ElementSettingKeys.RailId) ?? '';

    if (!variant) {
        return <LazyEpg theme={theme} />;
    }

    if (variant === WhatsOnVariantEnum.NextUp && railId === '') {
        return <LazyComingUp />;
    }

    const WhatsOnComponent = WhatsOnBodyMap[variant];

    return <WhatsOnComponent railId={railId} theme={theme} />;
};

export const WhatsOn: FC = () => {
    const theme = useElementSetting(ElementSettingKeys.MarketPropositionSection)
        ? ThemeEnum.ExtraDark
        : ThemeEnum.Dark;

    return (
        <Base theme={theme}>
            <div role="region" css={containerStyle}>
                <h2 css={titleStyle}>{useLocalisedStringKey(ResourceStringsKeys.WhatsOnTitle)}</h2>

                <Suspense fallback={null}>
                    <WhatsOnBody theme={theme} />
                </Suspense>
            </div>
        </Base>
    );
};
