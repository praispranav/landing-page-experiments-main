import { triggerErrorImpression } from '@tracking/index';
import { DaznError } from '@utils/dazn/DaznError';
import { getLocale } from '@utils/dazn/Region';

import { ServiceCategories } from '../shared/ServiceCategoriesEnum';
import { ServiceConfiguration } from '../types';
import { useService } from '../UseService';
import { IFaqArticle, IFaqResponse } from './types';

const FAQ_CONFIGURATION: ServiceConfiguration = {
    name: 'Help',
    version: 1,
    category: ServiceCategories.Help,
};

export const useFaq = (): IFaqArticle[] => {
    const locale = getLocale().toLowerCase();
    const path = `${locale}/categories/faq`;
    const { data } = useService<IFaqResponse>(FAQ_CONFIGURATION, {
        key: locale,
        path,
        onError: (error: DaznError) => {
            triggerErrorImpression('silent', error);
        },
    });

    return (
        data?.articles.map(({ url: articleSlug, ...article }) => ({
            ...article,
            path: `${locale}/help/articles/${articleSlug}`,
        })) ?? []
    );
};
