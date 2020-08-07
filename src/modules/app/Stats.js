// @flow
import type { ComponentType } from 'react';
import type { State, Dispatch } from '../../hooks/useAppState';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppStateContext from './AppStateContext';
import styles from './styles/Stats';

const useStyles = makeStyles(styles);

const Stats: ComponentType<{}> = () => {
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
  const [state, _, pairCount]: [State, Dispatch, number] = React.useContext(AppStateContext);

  // prettier-ignore
  return (
    <Typography variant="h6" className={classes.stats}>
      Click each card to reveal it. When a pair is matched, it will remain visible until the game finishes.<br />
      Unmatched pairs will be hidden after a short delay.<p/>
      You have solved {state.solved.size} out of {pairCount} pairs in {Math.floor(state.moves)} moves
    </Typography>
  );
};

export default React.memo<{}>(Stats);
