import { ElementSettingKeys } from '@config/ConfigsKeys';
import { useElementSetting } from '@hooks/utils/UseLocalisedConfig';
import { getServicePath } from '@utils/dazn/Service';
import React, { FC } from 'react';

import { useHeroDefaultPicture, useHeroPictureSources } from './HeroPicture.hooks';
import { getHeroImageStyle, getHeroPictureStyle } from './HeroPicture.style';

export const HeroPicture: FC = () => {
    const heroPictureStyleConfig = useElementSetting(ElementSettingKeys.HeroPicturePosition) ?? {};
    const heroImageStyleConfig = useElementSetting(ElementSettingKeys.HeroImagePosition) ?? {};

    const pictureSources = useHeroPictureSources();
    const defaultImage = useHeroDefaultPicture();
    const imageServiceVersion = 4;
    const imageServiceName = 'img'
    const imageServicePath = getServicePath(imageServiceName, imageServiceVersion)

    return (
        <picture data-testid="HERO_PICTURE" css={getHeroPictureStyle(heroPictureStyleConfig)}>
            {pictureSources.map(({ src, screenWidth }) => (
                <source
                    key={src}
                    srcSet={`${imageServicePath}${src}`}
                    media={`(min-width: ${screenWidth}px)`}
                    data-testid={`HERO_SOURCE_${screenWidth}`}
                />
            ))}

            <img
                data-testid="HERO_SOURCE_DEFAULT"
                src={defaultImage?.src ? `${imageServicePath}${defaultImage?.src}` : ''}
                css={getHeroImageStyle(heroImageStyleConfig)}
            />
        </picture>
    );
};
