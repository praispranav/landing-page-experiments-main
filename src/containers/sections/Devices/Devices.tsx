import { Button } from '@components/Button/Button';
import { buttonsSizeStyle } from '@components/Button/Button.style';
import { mqStylesCombiner } from '@components/Style/MqStylesCombiner';
import { ButtonsThemeEnum, ThemeEnum } from '@components/Style/Theme';
import { LinksKeys, ResourceStringsKeys } from '@config/ConfigsKeys';
import { Label } from '@dazn/fe-labels-react';
import { ResourceStringLabel } from '@hooks/resourceStrings/Types';
import { useResourceStringKey } from '@hooks/resourceStrings/UseLocalisedStrings';
import { useVariantLink } from '@hooks/utils/UseLocalisedConfig';
import { useLabelKey } from '@labels/labels';
import { ElementSection, ElementVisibilitySections } from '@tracking/events.types';
import { useImpressionTracking } from '@tracking/hooks/useImpressionTracking';
import { triggerElementClick } from '@tracking/index';
import { FC } from 'react';

import { Base } from '../Base/Base';
import { DEVICES_ICONS } from './constants';
import { DevicesIcons } from './DeviceIcons/DevicesIcons';
import { buttonStyle, contentStyle, subtitleStyle, titleStyle } from './Devices.style';

const { DevicesTitle, DevicesSubtitle, DevicesButton } = ResourceStringsKeys;

const onClickDevices =
    (link: string, stringsConfigKey: '' | ResourceStringLabel, resourceString: string) =>
    (): void => {
        triggerElementClick({
            section: ElementSection.Body,
            itemId: stringsConfigKey,
            resourceString,
        });
        global.location.assign(link);
    };

export const Devices: FC = () => {
    const buttonStringLabel = useResourceStringKey(DevicesButton);
    const buttonPath = useVariantLink(LinksKeys.DevicesButton);
    const buttonResourceString = useLabelKey({ stringKey: buttonStringLabel });

    const { setTrackingRef } = useImpressionTracking(ElementVisibilitySections.Devices);

    return (
        <Base
            continuation
            theme={ThemeEnum.ExtraDark}
            ref={setTrackingRef}
            testId="DEVICES_SECTION"
        >
            <Base.Container grid>
                <div data-testid="DEVICES" css={contentStyle}>
                    <Label
                        stringKey={useResourceStringKey(DevicesTitle)}
                        as="h1"
                        css={titleStyle}
                    />
                    <Label
                        stringKey={useResourceStringKey(DevicesSubtitle)}
                        as="p"
                        css={subtitleStyle}
                    />
                </div>
                <DevicesIcons icons={DEVICES_ICONS} />
                <div css={buttonStyle}>
                    <Button
                        id="DEVICES_CTA"
                        theme={ButtonsThemeEnum.OutlineDarkBg}
                        size={mqStylesCombiner([buttonsSizeStyle.Medium, buttonsSizeStyle.Small])}
                        onClick={onClickDevices(
                            buttonPath,
                            buttonStringLabel,
                            buttonResourceString,
                        )}
                    >
                        <Label stringKey={buttonStringLabel} />
                    </Button>
                </div>
            </Base.Container>
        </Base>
    );
};

export default Devices;
