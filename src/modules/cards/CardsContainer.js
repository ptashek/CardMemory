// @flow
import type { ComponentType } from 'react';
import type { State, Dispatch } from '../../hooks/useAppState';
import type { CardPair } from './utils';
import React from 'react';
import Box from '@material-ui/core/Box';
import colors from '@workday/canvas-colors-web';
import AppStateContext from '../app/AppStateContext';
import SolvedCard from './SolvedCard';
import Card from './Card';

type CardElement = React$Element<typeof Card | typeof SolvedCard>;

type VoidCallback = () => void;
type ClickHandler = (id: number, value: $Keys<typeof colors>) => VoidCallback;

type CardsContainerProps = {
  cardPairs: CardPair[],
};

const CardsContainer: ComponentType<CardsContainerProps> = (props: CardsContainerProps) => {
  const [state, dispatch]: [State, Dispatch, number] = React.useContext(AppStateContext);

  // dispatch is stable
  /* eslint-disable react-hooks/exhaustive-deps */
  const flip = React.useCallback(
    (id: number, value: $Keys<typeof colors>): VoidCallback =>
      dispatch({
        type: 'click',
        payload: {
          id,
          value,
        },
      }),
    [],
  );
  /* eslint-enable react-hooks/exhaustive-deps */

  const onCardClick: ClickHandler = (
    id: number,
    value: $Keys<typeof colors>,
  ): VoidCallback => () => {
    if (state.selected.size === 2) {
      dispatch({
        type: 'clearSelected',
      });
      setTimeout(() => flip(id, value), 150);
    } else {
      flip(id, value);
    }
  };

  const cardElements: CardElement[] = props.cardPairs.map(([color, pairIndex], id) => {
    const cardKey = `card-${id}`;

    if (state.solved.has(color)) {
      return <SolvedCard faceColor={color} faceText={String(pairIndex + 1)} key={cardKey} />;
    }

    return (
      <Card
        faceUp={state.selected.has(id)}
        faceColor={color}
        faceText={String(pairIndex + 1)}
        onClick={onCardClick(id, color)}
        key={cardKey}
      />
    );
  });

  return (
    <Box display="flex" flexWrap="wrap" justifyContent="flex-start" p={2} m={2}>
      {cardElements}
    </Box>
  );
};

export default React.memo<CardsContainerProps>(CardsContainer);
