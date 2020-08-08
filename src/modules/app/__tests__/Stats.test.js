import React from 'react';
import { render } from '@testing-library/react';
import AppStateContext from '../AppStateContext';
import Stats from '../Stats';

describe('<Stats />', () => {
  const state = {
    selected: new Map(),
    solved: new Set(['foo']),
    moves: 42,
  };

  test('matches snapshot', () => {
    const { container } = renderWithTheme(
      <AppStateContext.Provider value={[state, jest.fn(), 5]}>
        <Stats />
      </AppStateContext.Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  test('renders the intro text', () => {
    const { getByText } = renderWithTheme(
      <AppStateContext.Provider value={[state, jest.fn(), 5]}>
        <Stats />
      </AppStateContext.Provider>,
    );
    let introElement = getByText(
      /Click each card to reveal it. When a pair is matched, it will remain visible until the game finishes\./,
    );
    expect(introElement).toBeInTheDocument();

    introElement = getByText(/Unmatched pairs will be hidden after a short delay\./);
    expect(introElement).toBeInTheDocument();
  });

  test('renders the expected stats text', () => {
    const { getByText } = renderWithTheme(
      <AppStateContext.Provider value={[state, jest.fn(), 5]}>
        <Stats />
      </AppStateContext.Provider>,
    );

    const statsText = getByText(/You have solved 1 out of 5 pairs in 42 moves/);
    expect(statsText).toBeInTheDocument();
  });
});
