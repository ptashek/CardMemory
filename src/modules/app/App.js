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

const PAIR_COUNT: number = 5;

const App: ComponentType<{}> = () => {
  const [state, dispatch]: [State, Dispatch] = useAppState();

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AppStateContext.Provider value={[state, dispatch, PAIR_COUNT]}>
          <AppBar />
          <GameOverModal />
          <Stats />
          <CardsContainer />
        </AppStateContext.Provider>
      </ThemeProvider>
    </>
  );
};

export default App;
