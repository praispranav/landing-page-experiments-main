import { Footer } from '@containers/Footer/Footer';
import { Header } from '@containers/Header/Header';
import { Devices } from '@containers/sections/Devices/Devices';
import { Faq } from '@containers/sections/Faq/Faq';
import { HeroVariant } from '@containers/sections/Hero/Variant/HeroVariant';
import { MarketProposition } from '@containers/sections/MarketProposition/index';
import { WhatsOn } from '@containers/sections/WhatsOn/WhatsOn';
import { FELabelsProvider } from '@labels/labels';
import { usePageViewTracking } from '@tracking/hooks/usePageViewTracking';
import React, { FC, Suspense } from 'react';

import { useLocalisedConfig } from './configs';

const Redesign: FC = () => {
    useLocalisedConfig();
    usePageViewTracking();

    return (
        <main>
            <Header />
            <HeroVariant />
            <MarketProposition />
            <WhatsOn />
            <Devices />
            <Faq />
            <Footer />
        </main>
    );
};

const RedesignWithSuspense: FC = () => (
    <Suspense fallback={null}>
        <FELabelsProvider>
            <Redesign />
        </FELabelsProvider>
    </Suspense>
);

export default RedesignWithSuspense;
