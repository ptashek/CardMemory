import React from 'react';
import useInterval from '../../hooks/useInterval';
import AppStateContext from './AppStateContext';

const Timer = () => {
  const [state, dispatch, pairCount]: [State, Dispatch] = React.useContext(AppStateContext);
  const [timer, setTimer] = React.useState(state.timer);
  const gameOver = state.solved.size === pairCount;

  useInterval(() => setTimer(timer + 1), state.moves > 0 && !gameOver ? 1000 : null);

  // dispatch, timer and setTimer are stable
  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    if (state.moves === 0 && timer > 0) {
      setTimer(0);
    }
  }, [state.moves]);

  React.useEffect(() => {
    if (gameOver) {
      dispatch({ type: 'timer', timer });
    }
  }, [gameOver]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return `${timer} sec.`;
};

export default React.memo(Timer);
