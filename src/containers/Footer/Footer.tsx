import { ListsKeys } from '@config/ConfigsKeys';
import { Footer as FooterComponent } from '@dazn/lp-content-blocks';
import { FooterItem } from '@hooks/resourceStrings/Types';
import { useLocalisedLists } from '@hooks/utils/UseLocalisedConfig';
import { ElementSection, ElementVisibilitySections } from '@tracking/events.types';
import { useImpressionTracking } from '@tracking/hooks/useImpressionTracking';
import { triggerElementClick } from '@tracking/index';
import { FC, MouseEvent } from 'react';

import { footerStyle } from './Footer.style';
import { getLanguageSwitcherUrl, useLanguageSwitcherData } from './LanguageSwitcher.hooks';

const handleClick =
    (footerData: FooterItem[]) =>
    (event: MouseEvent<HTMLElement>): void => {
        const clickedElementData = footerData.find((item) => {
            const target = event.target as HTMLElement;
            return item.label === target.textContent;
        });

        if (clickedElementData) {
            triggerElementClick({
                section: ElementSection.Footer,
                itemId: clickedElementData.key,
                resourceString: clickedElementData.label || '',
            });
        }
    };

export const Footer: FC = () => {
    const footerList = (useLocalisedLists(ListsKeys.Footer) ?? []) as FooterItem[];

    const footerData = footerList.filter(
        (item: string | FooterItem): item is FooterItem => typeof item !== 'string',
    );

    const { languageSwitcherLabel, languageSwitcherkey } = useLanguageSwitcherData();

    if (languageSwitcherkey && languageSwitcherLabel) {
        footerData.unshift({
            key: languageSwitcherkey,
            label: languageSwitcherLabel,
            href: getLanguageSwitcherUrl(),
        });
    }

    const { setTrackingRef } = useImpressionTracking(ElementVisibilitySections.Footer);

    return (
        <div
            onClick={handleClick(footerData)}
            role="contentInfo"
            css={footerStyle}
            ref={setTrackingRef}
        >
            <FooterComponent menuItems={footerData} />
        </div>
    );
};
