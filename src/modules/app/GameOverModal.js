// @flow
import type { ComponentType } from 'react';
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

type GameOverModalProps = {
  onPlayAgainClick: () => void,
};

const GameOverModal: ComponentType<GameOverModalProps> = (props: GameOverModalProps) => {
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
  const [state, _, pairCount]: [State, Dispatch, number] = React.useContext(AppStateContext);

  if (state.solved.size !== pairCount) {
    return null;
  }

  return (
    <Modal
      data-testid="game-over-dialog"
      className={classes.modal}
      open={true}
      onClose={props.onPlayAgainClick}
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
            onClick={props.onPlayAgainClick}
          >
            Play again!
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default React.memo<GameOverModalProps>(GameOverModal);
