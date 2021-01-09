import React from 'react';
import { render, waitFor } from '@testing-library/react';
import AppStateContext from '../../app/AppStateContext';
import Timer from '../Timer';
import { ReceiptTwoTone } from '@material-ui/icons';

const dispatch = jest.fn();

const defaultState = {
  selected: new Map(),
  solved: new Set(),
  moves: 0,
  timer: 0,
};

const startedState = {
  selected: new Map(),
  solved: new Set(),
  moves: 1,
  timer: 0,
};

const solvedState = {
  selected: new Map(),
  solved: new Set(['foo']),
  moves: 1,
  timer: 10,
};

const subject = (state) =>
  render(
    <AppStateContext.Provider value={[state, dispatch, 1]}>
      <Timer />
    </AppStateContext.Provider>,
  );

describe('<Timer />', () => {
  test('renders correct text when game has not started', () => {
    const { container } = subject(defaultState);

    expect(container.textContent).toEqual('0 sec.');
  });

  test('updates local timer text when game has started', async () => {
    const { container } = subject(startedState);

    expect(container.textContent).toEqual('0 sec.');
    await waitFor(() => expect(container.textContent).toEqual('1 sec.'), { timeout: 1500 });
  });

  test('updates global timer value when game has finished', async () => {
    const { container } = subject(solvedState);

    expect(container.textContent).toEqual('10 sec.');
    await waitFor(() =>
      expect(dispatch).toHaveBeenCalledWith({
        type: 'timer',
        timer: 10,
      }),
    );
  });
});
