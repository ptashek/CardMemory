// @flow
import type { State, Dispatch } from '../../hooks/useAppState';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import AppStateContext from './AppStateContext';
import styles from './styles/GameOverModal';

const useStyles = makeStyles(styles);

const GameOverModal = () => {
  const classes = useStyles();
  const [state, dispatch, pairCount]: [State, Dispatch, number] = React.useContext(AppStateContext);

  const playAgain = React.useCallback(() => dispatch({ type: 'restart' }), [dispatch]);

  if (state.solved.size !== pairCount) {
    return null;
  }

  return (
    <Modal
      className={classes.modal}
      open={true}
      onClose={playAgain}
      aria-labelledby="modal-title"
      aria-describedby="modal-content"
    >
      <Grid
        container
        direction="column"
        wrap="nowrap"
        spacing={2}
        justify="space-around"
        alignItems="center"
        className={classes.paper}
      >
        <Grid item xs={12} id="modal-title">
          <Typography variant="h4">Well done!</Typography>
        </Grid>
        <Grid item xs={12} id="modal-content">
          <Typography variant="subtitle1">
            You have solved {pairCount} pairs in {Math.floor(state.moves)} moves.
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<RotateLeftIcon />}
            onClick={playAgain}
          >
            Play again!
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default React.memo<{}>(GameOverModal);
