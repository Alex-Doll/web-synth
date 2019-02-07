import { useState, useEffect, useDebugValue } from 'react';


export function useKeyPress(targetKey, handleKeyDown, handleKeyUp) {
  const [keyPressed, setKeyPressed] = useState(false);
  useDebugValue(targetKey);

  const downHandler = (event) => {
    if (event.key === targetKey) {
      setKeyPressed(true);
      handleKeyDown();
    }
  };

  const upHandler = (event) => {
    if (event.key === targetKey) {
      setKeyPressed(false);
      handleKeyUp();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', downHandler);
    document.addEventListener('keyup', upHandler);

    return () => {
      document.removeEventListener('keydown', downHandler);
      document.removeEventListener('keyup', upHandler);
    };
  }, [handleKeyDown, handleKeyUp]);

  return keyPressed;
}
