import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AppStateContext from '../AppStateContext';
import AppBar from '../AppBar';

describe('<AppBar onRestartClick={onRestart} />', () => {
  const onRestart = jest.fn();

  const defaultState = {
    selected: new Map(),
    solved: new Set(['foo']),
    moves: 42,
  };

  const solvedState = {
    selected: new Map(),
    solved: new Set(['foo', 'bar']),
    moves: 42,
  };

  test('renders the app icon', () => {
    const { getByTestId } = renderWithTheme(
      <AppStateContext.Provider value={[defaultState, jest.fn(), 5]}>
        <AppBar onRestartClick={onRestart} />
      </AppStateContext.Provider>,
    );

    expect(getByTestId('app-logo')).toBeInTheDocument();
  });

  test('renders the app title', () => {
    const { getByText } = renderWithTheme(
      <AppStateContext.Provider value={[defaultState, jest.fn(), 5]}>
        <AppBar onRestartClick={onRestart} />
      </AppStateContext.Provider>,
    );

    expect(getByText('Card Memory')).toBeInTheDocument();
  });

  test('renders the restart button', () => {
    const { getByRole } = renderWithTheme(
      <AppStateContext.Provider value={[defaultState, jest.fn(), 5]}>
        <AppBar onRestartClick={onRestart} />
      </AppStateContext.Provider>,
    );

    const button = getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button.textContent).toEqual('Restart');
  });

  test('the restart button is disabled if the player made no moves', () => {
    const state = {
      selected: new Map(),
      solved: new Set(),
      moves: 0,
    };
    const { getByRole } = renderWithTheme(
      <AppStateContext.Provider value={[state, jest.fn(), 5]}>
        <AppBar onRestartClick={onRestart} />
      </AppStateContext.Provider>,
    );

    expect(getByRole('button').disabled).toBe(true);
  });

  test('when clicked the restart button dispatches the correct action', () => {
    const dispatch = jest.fn();
    const state = {
      selected: new Map(),
      solved: new Set(),
      moves: 1,
    };
    const { getByRole } = renderWithTheme(
      <AppStateContext.Provider value={[state, dispatch, 5]}>
        <AppBar onRestartClick={onRestart} />
      </AppStateContext.Provider>,
    );

    const button = getByRole('button');
    expect(getByRole('button').disabled).toBe(false);

    fireEvent.click(button);
    expect(onRestart).toHaveBeenCalledTimes(1);
  });
});
