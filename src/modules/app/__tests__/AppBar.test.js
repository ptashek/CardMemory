import React from 'react';
import { fireEvent } from '@testing-library/react';
import AppStateContext from '../AppStateContext';
import AppBar from '../AppBar';

describe('<AppBar onRestartClick={onRestart} />', () => {
  const onRestart = jest.fn();

  const defaultState = {
    selected: new Map(),
    solved: new Set(['foo']),
    moves: 24,
    timer: 5,
  };

  const solvedState = {
    selected: new Map(),
    solved: new Set(['foo', 'bar']),
    moves: 42,
    timer: 10,
  };

  const subject = (state) =>
    renderWithTheme(
      <AppStateContext.Provider value={[state, jest.fn(), 5]}>
        <AppBar onRestartClick={onRestart} />
      </AppStateContext.Provider>,
    );

  test('renders the app icon', () => {
    const { getByTestId } = subject(defaultState);

    expect(getByTestId('app-logo')).toBeInTheDocument();
  });

  test('renders the app title', () => {
    const { getByText } = subject(defaultState);

    expect(getByText('Card Memory')).toBeInTheDocument();
  });

  test('renders the restart button', () => {
    const { getByRole } = subject(defaultState);

    const button = getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button.textContent).toEqual('Restart');
  });

  test('renders the timer', () => {
    const { queryByText } = subject(defaultState);

    const timer = queryByText('5 sec.');
    expect(timer).toBeInTheDocument();
  });

  test('the restart button is disabled if the player made no moves', () => {
    const state = {
      selected: new Map(),
      solved: new Set(),
      moves: 0,
    };

    const { getByRole } = subject(state);

    expect(getByRole('button').disabled).toBe(true);
  });

  test('when clicked the restart button dispatches the correct action', () => {
    const dispatch = jest.fn();
    const state = {
      selected: new Map(),
      solved: new Set(),
      moves: 1,
    };
    const { getByRole } = subject(state);

    const button = getByRole('button');
    expect(getByRole('button').disabled).toBe(false);

    fireEvent.click(button);
    expect(onRestart).toHaveBeenCalledTimes(1);
  });
});
