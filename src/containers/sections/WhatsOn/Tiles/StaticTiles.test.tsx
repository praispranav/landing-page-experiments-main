import { render } from '@testing-library/react';

import { StaticTiles } from './StaticTiles';

test.each`
    imageName
    ${'BOXING_NEWS'}
    ${'EL_PRESIDENTE'}
    ${'DAZN_ORIGINALS'}
    ${'CLASSIC_FIGHTS'}
`('should render static tile with image $imageName', ({ imageName }) => {
    const { queryByTestId } = render(<StaticTiles />);

    expect(queryByTestId(`IMAGE_TILE_${imageName}`)).toBeTruthy();
});
