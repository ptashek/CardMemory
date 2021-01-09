import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import * as utils from '../../cards/utils';
import useAppState from '../../../hooks/useAppState';
import App, { PAIR_COUNT as mockPairCount } from '../App';

const mockDispatch = jest.fn();
const mockAppState = {
  selected: new Map([[1, '1']]),
  solved: new Set(),
  moves: 1,
  timer: 1,
};

jest.mock('../../../hooks/useAppState', () => {
  return jest.fn(() => [mockAppState, mockDispatch]);
});

describe('<App />', () => {
  beforeAll(() => {
    const cardCount = mockPairCount * 2;
    const cards = [];
    for (let i = 0; i < cardCount; i++) {
      const pairIndex = Math.floor(i / 2);
      const colorName = `color-${pairIndex}`;
      cards.push([colorName, pairIndex]);
    }
    utils.generateCardPairs = jest.fn().mockReturnValue(cards);
  });

  afterEach(() => {
    utils.generateCardPairs.mockClear();
  });

  afterAll(() => {
    utils.generateCardPairs.mockRestore();
  });

  test('matches snapshot', () => {
    const { container } = renderWithTheme(<App />);
    expect(container).toMatchSnapshot();
  });

  test('renders the app log', () => {
    const { getByTestId } = renderWithTheme(<App />);
    expect(getByTestId('app-logo')).toBeInTheDocument();
  });

  test('renders the app title', () => {
    const { getByText } = renderWithTheme(<App />);
    const titleElement = getByText('Card Memory');
    expect(titleElement).toBeInTheDocument();
  });

  describe('the restart button', () => {
    test('renders', () => {
      const { getByRole } = renderWithTheme(<App />);
      const buttonElement = getByRole('button');
      expect(buttonElement.textContent).toEqual('Restart');
    });

    test('when enabled and clicked regenerates the cards', () => {
      const { getByRole } = renderWithTheme(<App />);
      fireEvent.click(getByRole('button'));
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'restart' });
      expect(utils.generateCardPairs).toHaveBeenNthCalledWith(2, mockPairCount);
    });
  });

  test('renders the intro text', () => {
    const { getByText } = renderWithTheme(<App />);
    let introElement = getByText(
      'Click each card to reveal it. When a pair is matched, it will remain visible until the game finishes. Only two unmatched cards can be revealed at any given time.',
    );

    expect(introElement).toBeInTheDocument();
  });

  test('renders the correct number of cards', () => {
    const { getAllByTestId } = renderWithTheme(<App />);
    const cardElements = getAllByTestId('card');
    expect(cardElements.length).toEqual(mockPairCount * 2);
  });
});
