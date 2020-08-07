// @flow
import type { ComponentType } from 'react';
import React from 'react';
import classnames from 'classnames';
import colors from '@workday/canvas-colors-web';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import styles from './styles/Card';

const useStyles = makeStyles(styles);

type CardProps = {
  faceColor: $Keys<typeof colors>,
  faceText: string,
  faceUp: boolean,
  onClick: () => void,
};

type CardFaceProps = {
  color: $Keys<typeof colors>,
  text: string,
};

type CardElement = ComponentType<CardProps>;

const CardBack: ComponentType<{}> = () => {
  const classes = useStyles();

  return (
    <HelpOutlineIcon
      className={classnames(classes.cardContent, classes.faceCommon, classes.icon)}
    />
  );
};

export const CardFace: ComponentType<CardFaceProps> = (props: CardFaceProps) => {
  const classes = useStyles();

  return (
    <Box
      borderRadius={16}
      bgcolor={`colors.${props.color}`}
      width="100%"
      height="100%"
      className={classnames(classes.cardContent, classes.faceUp)}
    >
      <Avatar component="span" className={classnames(classes.faceCommon, classes.avatar)}>
        {props.text}
      </Avatar>
    </Box>
  );
};

const Card: CardElement = (props: CardProps) => {
  const classes = useStyles();
  let content;

  if (props.faceUp) {
    content = <CardFace text={props.faceText} color={props.faceColor} />;
  } else {
    content = <CardBack />;
  }

  return (
    <Box
      borderRadius={16}
      boxShadow={3}
      width={80}
      height={80}
      m={2}
      onClick={props.onClick}
      className={classnames(classes.card, { [classes.faceUp]: props.faceUp })}
    >
      {content}
    </Box>
  );
};

export default React.memo<CardProps>(Card);
