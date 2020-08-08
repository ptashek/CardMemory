import React from 'react';
import { render } from '@testing-library/react';
import SolvedCard from '../SolvedCard';

describe('<SolvedCard />', () => {
  test('matches snapshot', () => {
    const { container } = renderWithTheme(<SolvedCard faceColor="cinnamon300" faceText="42" />);
    expect(container).toMatchSnapshot();
  });

  test('renders the passed in face text', () => {
    const { getByText } = renderWithTheme(<SolvedCard faceColor="cinnamon300" faceText="42" />);
    const avatarElement = getByText('42');
    expect(avatarElement).toBeInTheDocument();
  });
});
