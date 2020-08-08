// @flow
import type { ComponentType } from 'react';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import colors from '@workday/canvas-colors-web';
import styles from './styles/SolvedCard';

const useStyles = makeStyles(styles);

type SolvedCardProps = {
  faceColor: $Keys<typeof colors>,
  faceText: string,
};

const SolvedCard: ComponentType<SolvedCardProps> = (props: SolvedCardProps) => {
  const classes = useStyles();

  return (
    <Box
      data-testid="solved-card"
      borderRadius={16}
      boxShadow={3}
      width={80}
      height={80}
      m={2}
      bgcolor={`colors.${props.faceColor}`}
    >
      <Avatar className={classes.avatar}>{props.faceText}</Avatar>
    </Box>
  );
};

export default React.memo<SolvedCardProps>(SolvedCard);
