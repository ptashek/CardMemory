// @flow
import type { ComponentType } from 'react';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import styles from './styles/Stats';

const useStyles = makeStyles(styles);

const Stats: ComponentType<{}> = () => {
  const classes = useStyles();

  return (
    <Typography variant="h6" className={classes.stats}>
      Click each card to reveal it. When a pair is matched, it will remain visible until the game
      finishes. Only two unmatched cards can be revealed at any given time.
    </Typography>
  );
};

export default React.memo<{}>(Stats);
