import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AppStateContext from '../AppStateContext';
import GameOverModal from '../GameOverModal';

describe('<GameOverModal />', () => {
  const dispatch = jest.fn();
  const onPlayAgain = jest.fn();
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

  test('does not render when solved pair count does not match total', () => {
    const { queryByTestId } = renderWithTheme(
      <AppStateContext.Provider value={[defaultState, dispatch, 2]}>
        <GameOverModal onPlayAgainClick={onPlayAgain} />
      </AppStateContext.Provider>,
    );

    expect(queryByTestId('game-over-dialog')).toBeFalsy();
  });

  test('renders if solved pair count matches total', () => {
    const { getByTestId } = renderWithTheme(
      <AppStateContext.Provider value={[solvedState, dispatch, 2]}>
        <GameOverModal onPlayAgainClick={onPlayAgain} />
      </AppStateContext.Provider>,
    );

    expect(getByTestId('game-over-dialog')).toBeInTheDocument();
  });

  test('has the play again button', () => {
    const { getByText } = renderWithTheme(
      <AppStateContext.Provider value={[solvedState, dispatch, 2]}>
        <GameOverModal onPlayAgainClick={onPlayAgain} />
      </AppStateContext.Provider>,
    );

    expect(getByText('Play again!')).toBeInTheDocument();
  });

  test('when clicked the play again button dispatches the correct action', () => {
    const { getByText } = renderWithTheme(
      <AppStateContext.Provider value={[solvedState, dispatch, 2]}>
        <GameOverModal onPlayAgainClick={onPlayAgain} />
      </AppStateContext.Provider>,
    );

    fireEvent.click(getByText('Play again!'));
    expect(onPlayAgain).toHaveBeenCalledTimes(1);
  });
});
