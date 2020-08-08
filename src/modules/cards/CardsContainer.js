// @flow
import type { ComponentType } from 'react';
import type { State, Dispatch } from '../../hooks/useAppState';
import type { CardPair } from '../../utils';
import React from 'react';
import Box from '@material-ui/core/Box';
import colors from '@workday/canvas-colors-web';
import AppStateContext from '../app/AppStateContext';
import { generateCardPairs } from '../../utils';
import SolvedCard from './SolvedCard';
import Card from './Card';

type CardElement = React$Element<typeof Card | typeof SolvedCard>;

type VoidCallback = () => void;
type ClickHandler = (id: number, value: $Keys<typeof colors>) => VoidCallback;

const CardsContainer: ComponentType<{}> = () => {
  const [state, dispatch, pairCount]: [State, Dispatch, number] = React.useContext(AppStateContext);

  React.useEffect(() => {
    if (state.selected.size === 2) {
      setTimeout(() => {
        dispatch({ type: 'clearSelected' });
      }, 1000);
    }
  }, [state, dispatch]);

  const clickHandlerFor: ClickHandler = React.useCallback(
    (id: number, value: $Keys<typeof colors>): VoidCallback => () => {
      dispatch({
        type: 'click',
        payload: {
          id,
          value,
        },
      });
    },
    [dispatch],
  );

  const cardPairs = React.useMemo<CardPair[]>(() => generateCardPairs(pairCount), [pairCount]);

  const cardElements = React.useMemo<CardElement[]>(() => {
    return cardPairs.map(([color, pairIndex], id) => {
      const cardKey = `card-${id}`;

      if (state.solved.has(color)) {
        return <SolvedCard faceColor={color} faceText={String(pairIndex + 1)} key={cardKey} />;
      }

      return (
        <Card
          faceUp={state.selected.has(id)}
          faceColor={color}
          faceText={String(pairIndex + 1)}
          onClick={clickHandlerFor(id, color)}
          key={cardKey}
        />
      );
    });
  }, [cardPairs, state, clickHandlerFor]);

  return (
    <Box display="flex" flexWrap="wrap" justifyContent="flex-start" p={2} m={2}>
      {cardElements}
    </Box>
  );
};

export default React.memo<{}>(CardsContainer);
