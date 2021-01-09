import React from 'react';
import { fireEvent } from '@testing-library/react';
import AppStateContext from '../AppStateContext';
import GameOverModal from '../GameOverModal';

describe('<GameOverModal />', () => {
  const dispatch = jest.fn();
  const onPlayAgain = jest.fn();
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
      <AppStateContext.Provider value={[state, dispatch, 2]}>
        <GameOverModal onPlayAgainClick={onPlayAgain} />
      </AppStateContext.Provider>,
    );

  test('does not render when solved pair count does not match total', () => {
    const { queryByTestId } = subject(defaultState);

    expect(queryByTestId('game-over-dialog')).toBeFalsy();
  });

  test('renders if solved pair count matches total', () => {
    const { getByTestId } = subject(solvedState);

    expect(getByTestId('game-over-dialog')).toBeInTheDocument();
  });

  test('renders the stats text', () => {
    const { queryByText } = subject(solvedState);
    const modalContent = queryByText(
      'You have solved 2 pairs in 42 moves over 10 seconds (4.20 moves/s).',
    );

    expect(modalContent).toBeInTheDocument();
  });

  test('has the play again button', () => {
    const { getByText } = subject(solvedState);

    expect(getByText('Play again!')).toBeInTheDocument();
  });

  test('when clicked the play again button dispatches the correct action', () => {
    const { getByText } = subject(solvedState);

    fireEvent.click(getByText('Play again!'));
    expect(onPlayAgain).toHaveBeenCalledTimes(1);
  });
});
