// @flow
import type { ComponentType } from 'react';
import type { AppBarProps as MUIAppBarProps } from '@material-ui/core/AppBar';
import type { State } from '../../hooks/useAppState';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MUIAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import GamepadIcon from '@material-ui/icons/Gamepad';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import AppStateContext from './AppStateContext';
import Timer from './Timer';
import styles from './styles/AppBar';

const useStyles = makeStyles(styles);

type AppBarProps = MUIAppBarProps & {
  onRestartClick: () => void,
};

const AppBar: ComponentType<AppBarProps> = (props: AppBarProps) => {
  const classes = useStyles();
  const [state]: [State] = React.useContext(AppStateContext);
  const { onRestartClick, ...muiAppBarProps } = props;

  return (
    <MUIAppBar className={classes.root} position="sticky" {...muiAppBarProps}>
      <Toolbar variant="dense">
        <GamepadIcon data-testid="app-logo" className={classes.icon} />
        <Typography variant="h6" className={classes.title} noWrap>
          Card Memory
        </Typography>
        <Typography variant="h6" className={classes.title} noWrap>
          <Timer />
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          disabled={state.moves === 0}
          startIcon={<RotateLeftIcon />}
          onClick={onRestartClick}
        >
          Restart
        </Button>
      </Toolbar>
    </MUIAppBar>
  );
};

export default React.memo<AppBarProps>(AppBar);
