import React from 'react';
import { render, fireEvent, getByTestId } from '@testing-library/react';
import Card from '../Card';

describe('<Card />', () => {
  const onClick = jest.fn();

  test('renders the passed in face text when face up', () => {
    const { getByText, queryByTestId } = renderWithTheme(
      <Card faceColor="cinnamon300" faceText="42" faceUp={true} onClick={onClick} />,
    );
    const backFaceIcon = queryByTestId('card-back-icon');
    const frontFaceText = getByText('42');

    expect(backFaceIcon).toBeFalsy();
    expect(frontFaceText).toBeInTheDocument();
  });

  test('renders the back icon when face down', () => {
    const { queryByText, getByTestId } = renderWithTheme(
      <Card faceColor="cinnamon300" faceText="42" faceUp={false} onClick={onClick} />,
    );
    const backFaceIcon = getByTestId('card-back-icon');
    const frontFaceText = queryByText('42');

    expect(backFaceIcon).toBeInTheDocument();
    expect(frontFaceText).toBeFalsy();
  });

  test('calls the click handler from props when clicked', () => {
    const { container } = renderWithTheme(
      <Card faceColor="cinnamon300" faceText="42" faceUp={false} onClick={onClick} />,
    );

    fireEvent.click(container.firstChild);
    expect(onClick).toHaveBeenCalled();
  });
});
