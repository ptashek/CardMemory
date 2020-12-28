// @flow
import React from 'react';
import colors from '@workday/canvas-colors-web';

type ClickActionPayload = {
  id: number,
  value: $Keys<typeof colors>,
};

type Action = {
  type: string,
  payload?: ClickActionPayload,
};

export type State = {
  selected: Map<number, string>,
  solved: Set<string>,
  moves: number,
  timer: number,
};

export type Dispatch = (action: Action) => void;

const initialState = (): State => ({
  selected: new Map(),
  solved: new Set(),
  moves: 0,
  timer: 0,
});

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    default:
      return state;

    case 'timer':
      return { ...state, timer: action.timer };

    case 'restart':
      return initialState();

    case 'clearSelected': {
      const nextState = { ...state };
      nextState.selected.clear();
      return nextState;
    }

    case 'click': {
      if (!action?.payload || state.selected.size === 2) {
        return state;
      }

      const { id, value } = action.payload;
      const nextState: State = { ...state };

      if (!nextState.selected.has(id)) {
        nextState.selected.set(id, value);
        const entries = nextState.selected.entries();
        const matchedSelectedEntries = Array.from(entries).filter(([_, v]) => v === value);

        if (matchedSelectedEntries.length === 2) {
          matchedSelectedEntries.forEach(([key]) => {
            nextState.selected.delete(key);
          });
          nextState.solved.add(value);
        }
      } else {
        nextState.selected.delete(id);
      }

      // each click represents half a move
      nextState.moves += 0.5;
      return nextState;
    }
  }
};

export default (): [State, Dispatch] => React.useReducer(reducer, initialState());
