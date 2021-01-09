// @flow
// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
import React from 'react';

const useInterval = (callback: Function, delay: Number | null) => {
  const savedCallback = React.useRef();

  React.useEffect(() => {
    savedCallback.current = callback;
  });

  React.useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };

    if (delay) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export default useInterval;
