export enum LabelColors {
    gloves = 'gloves',
    neon = 'neon',
    chalk = 'chalk',
}

export enum LabelSizes {
    small = 'small',
    large = 'large',
}

export interface LabelProps {
    backgroundColor: LabelColors;
    size: LabelSizes;
}
