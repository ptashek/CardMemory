import useAppState from '../useAppState';
import { renderHook, act } from '@testing-library/react-hooks';

const expectedInitialState = {
  selected: new Map(),
  solved: new Set(),
  moves: 0,
};

/*
  Using result.current below as renderHook mutates the value of current
  making destructuring pointless as it copies a point-in-time value

  https://react-hooks-testing-library.com/usage/basic-hooks
*/

describe('useAppState', () => {
  test('returns unmodified state when an unknown action is received', () => {
    const { result } = renderHook(() => useAppState());

    expect(result.current[0]).toMatchObject(expectedInitialState);
    act(() => {
      result.current[1]({ type: 'unit.test' });
    });
    expect(result.current[0]).toMatchObject(expectedInitialState);
  });

  test('returns initial state when the "restart" action is received', () => {
    const { result } = renderHook(() => useAppState());

    expect(result.current[0]).toMatchObject(expectedInitialState);
    act(() => {
      result.current[1]({ type: 'restart' });
    });
    expect(result.current[0]).toMatchObject(expectedInitialState);
  });

  describe('the "click" action', () => {
    test('with no other cards selected, correctly updates state', () => {
      const { result } = renderHook(() => useAppState());

      expect(result.current[0]).toMatchObject(expectedInitialState);
      act(() => {
        result.current[1]({
          type: 'click',
          payload: {
            id: 1,
            value: '1',
          },
        });
      });

      expect(result.current[0]).toMatchObject({
        ...expectedInitialState,
        selected: new Map([[1, '1']]),
        moves: 0.5,
      });
    });

    test('with another unmatched card selected, correctly updates state', () => {
      const { result } = renderHook(() => useAppState());

      expect(result.current[0]).toMatchObject(expectedInitialState);
      act(() => {
        result.current[1]({
          type: 'click',
          payload: {
            id: 1,
            value: '1',
          },
        });
      });
      act(() => {
        result.current[1]({
          type: 'click',
          payload: {
            id: 5,
            value: '5',
          },
        });
      });

      expect(result.current[0]).toMatchObject({
        ...expectedInitialState,
        selected: new Map([
          [1, '1'],
          [5, '5'],
        ]),
        moves: 1,
      });
    });

    test('with another matched card selected, correctly updates state when', () => {
      const { result } = renderHook(() => useAppState());

      expect(result.current[0]).toMatchObject(expectedInitialState);
      act(() => {
        result.current[1]({
          type: 'click',
          payload: {
            id: 1,
            value: '1',
          },
        });
      });
      act(() => {
        result.current[1]({
          type: 'click',
          payload: {
            id: 5,
            value: '1',
          },
        });
      });

      expect(result.current[0]).toMatchObject({
        selected: new Map(),
        solved: new Set(['1']),
        moves: 1,
      });
    });

    test('with two cards already selected, returns unmodified state', () => {
      const { result } = renderHook(() => useAppState());

      expect(result.current[0]).toMatchObject(expectedInitialState);
      act(() => {
        result.current[1]({
          type: 'click',
          payload: {
            id: 1,
            value: '1',
          },
        });
      });
      act(() => {
        result.current[1]({
          type: 'click',
          payload: {
            id: 2,
            value: '5',
          },
        });
      });
      act(() => {
        result.current[1]({
          type: 'click',
          payload: {
            id: 3,
            value: '7',
          },
        });
      });

      expect(result.current[0]).toMatchObject({
        ...expectedInitialState,
        selected: new Map([
          [1, '1'],
          [2, '5'],
        ]),
        moves: 1,
      });
    });

    test('when the same card is clicked twice, correctly updates state', () => {
      const { result } = renderHook(() => useAppState());

      expect(result.current[0]).toMatchObject(expectedInitialState);
      act(() => {
        result.current[1]({
          type: 'click',
          payload: {
            id: 1,
            value: '1',
          },
        });
      });

      expect(result.current[0]).toMatchObject({
        ...expectedInitialState,
        selected: new Map([[1, '1']]),
        moves: 0.5,
      });

      act(() => {
        result.current[1]({
          type: 'click',
          payload: {
            id: 1,
            value: '1',
          },
        });
      });

      expect(result.current[0]).toMatchObject({
        ...expectedInitialState,
        moves: 1,
      });
    });
  });

  test('correctly updates state when "clearSelected" action is received', () => {
    const { result } = renderHook(() => useAppState());

    expect(result.current[0]).toMatchObject(expectedInitialState);
    act(() => {
      result.current[1]({
        type: 'click',
        payload: {
          id: 1,
          value: '1',
        },
      });
    });

    expect(result.current[0]).toMatchObject({
      ...expectedInitialState,
      selected: new Map([[1, '1']]),
      moves: 0.5,
    });

    act(() => {
      result.current[1]({ type: 'clearSelected' });
    });

    expect(result.current[0]).toMatchObject({
      ...expectedInitialState,
      selected: new Map(),
      moves: 0.5,
    });
  });
});
