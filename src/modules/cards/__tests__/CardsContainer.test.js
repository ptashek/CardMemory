import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import * as utils from '../../../utils';
import AppStateContext from '../../app/AppStateContext';
import CardsContainer from '../CardsContainer';

describe('<CardsContainer />', () => {
  const pairCount = 5;
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

  beforeAll(() => {
    const cardCount = pairCount * 2;
    const cards = [];
    for (let i = 0; i < cardCount; i++) {
      const pairIndex = Math.floor(i / 2);
      const colorName = `color-${pairIndex}`;
      cards.push([colorName, pairIndex]);
    }
    utils.generateCardPairs = jest.fn().mockReturnValue(cards);
  });

  afterAll(() => {
    utils.generateCardPairs.restoreMock();
  });

  test('renders the expected number of cards', () => {
    const { queryAllByTestId } = renderWithTheme(
      <AppStateContext.Provider value={[defaultState, dispatch, pairCount]}>
        <CardsContainer />
      </AppStateContext.Provider>,
    );

    expect(queryAllByTestId('card-', { exact: false }).length).toEqual(pairCount * 2);
  });

  test('all cards render face down by default', () => {
    const { queryAllByTestId } = renderWithTheme(
      <AppStateContext.Provider value={[defaultState, dispatch, pairCount]}>
        <CardsContainer />
      </AppStateContext.Provider>,
    );

    expect(queryAllByTestId('solved-card').length).toEqual(0);
    expect(queryAllByTestId('card').length).toEqual(pairCount * 2);
  });

  test('solved cards render face up by default', () => {
    const { queryAllByTestId } = renderWithTheme(
      <AppStateContext.Provider value={[solvedState, dispatch, pairCount]}>
        <CardsContainer />
      </AppStateContext.Provider>,
    );

    expect(queryAllByTestId('card').length).toEqual((pairCount - solvedState.solved.size) * 2);
    expect(queryAllByTestId('solved-card').length).toEqual(solvedState.solved.size * 2);
  });

  test('selected cards render face up by default', () => {
    const { queryAllByTestId } = renderWithTheme(
      <AppStateContext.Provider value={[selectedState, dispatch, pairCount]}>
        <CardsContainer />
      </AppStateContext.Provider>,
    );

    const selectedCards = queryAllByTestId(
      (content, element) => content === 'card' && ['0', '1'].includes(element.textContent),
    );

    expect(selectedCards.length).toEqual(selectedState.selected.size);
  });

  test('non-matching selected pair is turned face down after a short delay', async () => {
    renderWithTheme(
      <AppStateContext.Provider value={[selectedState, dispatch, pairCount]}>
        <CardsContainer />
      </AppStateContext.Provider>,
    );

    await waitFor(() => expect(dispatch).toHaveBeenCalledWith({ type: 'clearSelected' }), {
      timeout: 1100,
    });
  });

  test('when a card is clicked the correct click action is dispatched', async () => {
    const { getAllByTestId } = renderWithTheme(
      <AppStateContext.Provider value={[defaultState, dispatch, pairCount]}>
        <CardsContainer />
      </AppStateContext.Provider>,
    );

    const card = getAllByTestId('card')[0];
    expect(card).toBeInTheDocument();

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
