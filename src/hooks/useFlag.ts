import { useCallback, useState } from 'react';

export const useFlag = () => {
  const [isTrue, setIsTrue] = useState(false);

  const setTrue = useCallback(() => setIsTrue(true), []);
  const setFalse = useCallback(() => setIsTrue(false), []);

  return { setTrue, setFalse, isTrue };
};
