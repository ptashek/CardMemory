// @flow
import type { ComponentType } from 'react';
import type { State, Dispatch } from '../../hooks/useAppState';
import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import useAppState from '../../hooks/useAppState';
import CardsContainer from '../cards/CardsContainer';
import AppStateContext from './AppStateContext';
import AppBar from './AppBar';
import Stats from './Stats';
import GameOverModal from './GameOverModal';
import theme from './styles/theme';
import { generateCardPairs } from '../cards/utils';

// exported for testing purposes only
export const PAIR_COUNT: number = 10;

const App: ComponentType<{}> = () => {
  const [state, dispatch]: [State, Dispatch] = useAppState();
  const [cardPairs, setCardPairs] = React.useState(generateCardPairs(PAIR_COUNT));

  // dispatch is stable
  /* eslint-disable react-hooks/exhaustive-deps */
  const restartGame = React.useCallback(() => {
    dispatch({ type: 'restart' });
    setCardPairs(generateCardPairs(PAIR_COUNT));
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AppStateContext.Provider value={[state, dispatch, PAIR_COUNT]}>
          <AppBar onRestartClick={restartGame} />
          <GameOverModal onPlayAgainClick={restartGame} />
          <Stats />
          <CardsContainer cardPairs={cardPairs} />
        </AppStateContext.Provider>
      </ThemeProvider>
    </>
  );
};

export default App;
