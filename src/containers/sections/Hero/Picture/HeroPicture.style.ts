import colors from '@components/Style/Colors';
import { gridMediaQuery } from '@components/Style/Grid';
import { CSSInterpolation } from '@emotion/serialize';
import facepaint from 'facepaint';

const styleCoverContainer = gridMediaQuery({
    position: 'absolute',
    width: '100%',
    height: '100%',
});

const gradientDirections = [
    { deg: 1, starting: '17%', finishing: '63.39%' },
    { deg: 0, starting: '0%', finishing: '70%' },
    { deg: 76.33, starting: '17%', finishing: '63.39%' },
];

const gradientBackgrounds = gradientDirections.map(
    (gradient) =>
        `linear-gradient(${gradient.deg}deg, ${colors.tarmac} ${gradient.starting}, rgba(0, 0, 0, 0) ${gradient.finishing})`,
);

const heroGradient = gridMediaQuery(styleCoverContainer, {
    zIndex: 5,
    content: '""',
    display: 'inline-block',
    height: ['480px', '100%'],
    top: [0, 0, 'auto'],
    bottom: ['auto', 'auto', 0],
    backgroundImage: gradientBackgrounds,
    backgroundSize: ['auto', 'auto', 'cover'],
    backgroundPosition: ['bottom right', 'bottom right', 'top right'],
    backgroundRepeat: 'no-repeat',
});

const heroGradientBlock = gridMediaQuery(styleCoverContainer, {
    zIndex: 5,
    content: '""',
    display: ['inline-block', 'none'],
    top: '480px',
    background: colors.tarmac,
});

export const getHeroPictureStyle = (heroStyle: facepaint.Arg): CSSInterpolation =>
    gridMediaQuery({
        position: 'absolute',
        height: ['auto', 'auto', '100%'],
        width: ['auto', '100%'],
        right: 0,
        top: 0,
        maxWidth: '1920px',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: ['center', 'flex-end'],

        '&:before': heroGradient,
        '&:after': heroGradientBlock,
        ...heroStyle,
    });

export const getHeroImageStyle = (heroStyle: facepaint.Arg): CSSInterpolation =>
    gridMediaQuery({
        height: '100%',
        width: ['100%', '100%', '80%', '75%'],
        objectFit: 'cover',
        objectPosition: '100% 0px',
        maskImage: [
            `linear-gradient(180deg, ${colors.tarmac} 75%, rgba(0, 0, 0, 0) 100%)`,
            `linear-gradient(180deg, ${colors.tarmac} 0%, rgba(0, 0, 0, 0) 100%)`,
            `linear-gradient(270deg, ${colors.tarmac} 75%, rgba(0, 0, 0, 0) 100%)`,
        ],
        flexShrink: 0,
        ...heroStyle,
    });
