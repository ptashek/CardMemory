import React from 'react';
import Stats from '../Stats';

describe('<Stats />', () => {
  test('matches snapshot', () => {
    const { container } = renderWithTheme(<Stats />);
    expect(container).toMatchSnapshot();
  });
});
