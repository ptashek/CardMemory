import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

describe('<App />', () => {
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

  test('renders the restart button', () => {
    const { getByRole } = renderWithTheme(<App />);
    const buttonElement = getByRole('button');
    expect(buttonElement.textContent).toEqual('Restart');
  });

  test('renders the intro text', () => {
    const { getByText } = renderWithTheme(<App />);
    let introElement = getByText(
      /Click each card to reveal it. When a pair is matched, it will remain visible until the game finishes\./,
    );
    expect(introElement).toBeInTheDocument();

    introElement = getByText(/Unmatched pairs will be hidden after a short delay\./);
    expect(introElement).toBeInTheDocument();
  });

  test('renders the stats text', () => {
    const { getByText } = renderWithTheme(<App />);
    const introElement = getByText(/You have solved \d+ out of \d+ pairs in \d+ moves/);
    expect(introElement).toBeInTheDocument();
  });

  test('renders the correct number of cards', () => {
    const { getAllByTestId } = renderWithTheme(<App />);
    const cardElements = getAllByTestId('card');
    expect(cardElements.length).toEqual(10);
  });
});
