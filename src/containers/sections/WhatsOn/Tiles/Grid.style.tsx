import { gridMediaQuery } from '@components/Style/Grid';

const templateColumns = [1, 2, 3, 4];

export const gridStyle = gridMediaQuery({
    display: 'grid',
    margin: '0 -16px -16px 0',
    gridTemplateColumns: templateColumns.map((columnNumber) => `repeat(${columnNumber}, 1fr)`),
});
