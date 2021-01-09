import React from 'react';
import { waitFor, fireEvent } from '@testing-library/react';
import AppStateContext from '../../app/AppStateContext';
import CardsContainer from '../CardsContainer';

describe('<CardsContainer cardPairs={cardPairs} />', () => {
  const dispatch = jest.fn();
  const defaultState = {
    selected: new Map(),
    solved: new Set(),
    moves: 0,
  };

  const solvedState = {
    selected: new Map(),
    solved: new Set(['color-0', 'color-1']),
    moves: 42,
  };

  const selectedState = {
    selected: new Map([
      [0, 'color-0'],
      [1, 'color-1'],
    ]),
    solved: new Set(),
    moves: 42,
  };

  const cardPairs = [];
  const pairCount = 3;
  const cardCount = pairCount * 2;
  for (let i = 0; i < cardCount; i++) {
    const pairIndex = Math.floor(i / 2);
    const colorName = `color-${pairIndex}`;
    cardPairs.push([colorName, pairIndex]);
  }

  const subject = (state) =>
    renderWithTheme(
      <AppStateContext.Provider value={[state, dispatch, pairCount]}>
        <CardsContainer cardPairs={cardPairs} />
      </AppStateContext.Provider>,
    );

  test('renders the expected number of cards', () => {
    const { queryAllByTestId } = subject(defaultState);

    expect(queryAllByTestId('card-', { exact: false }).length).toEqual(pairCount * 2);
  });

  test('all cards render face down by default', () => {
    const { queryAllByTestId } = subject(defaultState);

    expect(queryAllByTestId('solved-card').length).toEqual(0);
    expect(queryAllByTestId('card').length).toEqual(pairCount * 2);
  });

  test('solved cards render face up by default', () => {
    const { queryAllByTestId } = subject(solvedState);

    expect(queryAllByTestId('card').length).toEqual((pairCount - solvedState.solved.size) * 2);
    expect(queryAllByTestId('solved-card').length).toEqual(solvedState.solved.size * 2);
  });

  test('selected cards render face up by default', () => {
    const { queryAllByTestId } = subject(selectedState);

    const selectedCards = queryAllByTestId(
      (content, element) => content === 'card' && ['0', '1'].includes(element.textContent),
    );

    expect(selectedCards.length).toEqual(selectedState.selected.size);
  });

  test('non-matching selected pair is turned face down after another card clicked', async () => {
    const { queryAllByTestId } = subject(selectedState);

    const otherCards = queryAllByTestId(
      (content, element) => content === 'card' && element.textContent.length === 0,
    );

    expect(otherCards.length).not.toBe(0);
    fireEvent.click(otherCards[0]);

    await waitFor(() => expect(dispatch).toHaveBeenCalledWith({ type: 'clearSelected' }));
  });

  test('when a card is clicked the correct click action is dispatched', async () => {
    const { getAllByTestId } = subject(defaultState);

    const card = getAllByTestId('card')[0];
    fireEvent.click(card);

    await waitFor(
      () =>
        expect(dispatch).toHaveBeenCalledWith({
          type: 'click',
          payload: {
            id: 0,
            value: 'color-0',
          },
        }),
      { timeout: 10 },
    );
  });
});
