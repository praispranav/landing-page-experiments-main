import './polyfills';
import '@fe-experiments/config';

import Redesign from '@experiments/e_ar_landingpageredesign_versusoldlp/redesign';
import { VariantConfigsProvider } from '@experiments/VariantConfigsProvider';
import {
    getDisplayTypeVariant,
    getWhatsOnRailId,
    getWhatsOnVariant,
    isAnnouncementBanner,
    isDisplayTypeFlagEnabled,
    isHeroDetailsEnabled,
    isWhatsOnFlagEnabled,
    showMarketProposition,
    showPPV,
} from '@fe-experiments/features';
import { unsubscribeEvents } from '@tracking/index';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { AppWrapper } from './AppWrapper';
import { overrideExperimentConfig } from './experiments/OverrideConfig';

export const Experiments = ({ root }: { root: HTMLElement }): JSX.Element => {
    useEffect(() => {
        const onUnload = (): Promise<void> => {
            unsubscribeEvents();
            ReactDOM.unmountComponentAtNode(root);

            return Promise.resolve();
        };

        document.title = 'DAZN';
        window.dazn.lifecycle.onChapterUnload(onUnload);
    }, [root]);

    const overrideConfigFn = overrideExperimentConfig({
        showPPV: showPPV(),
        showMarketProposition: showMarketProposition(),
        heroOfferDisplayType: isDisplayTypeFlagEnabled() ? getDisplayTypeVariant() : undefined,
        showAnnouncementBanner: isAnnouncementBanner(),
        whatsOnVariant: isWhatsOnFlagEnabled() ? getWhatsOnVariant() : undefined,
        railId: isWhatsOnFlagEnabled() ? getWhatsOnRailId() : '',
        showHeroDetails: isHeroDetailsEnabled(),
    });

    return (
        <AppWrapper>
            <VariantConfigsProvider overrideConfigFn={overrideConfigFn}>
                <Redesign />
            </VariantConfigsProvider>
        </AppWrapper>
    );
};

export default function render(element: HTMLElement): void {
    ReactDOM.render(<Experiments root={element} />, element);
}
