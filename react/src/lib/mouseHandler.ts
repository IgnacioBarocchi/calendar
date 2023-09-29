// todo: support touch events
import { MouseEvent } from 'react';

const debounce = (
  func: (event: MouseEvent, ...args: unknown[]) => void,
  delay: number,
) => {
  let timerId: number;
  return (event: MouseEvent, ...args: unknown[]) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func(event, ...args);
    }, delay);
  };
};

const mouseHandler = (
  event: MouseEvent,
  callback: (event: MouseEvent, ...rest: unknown[]) => void,
  delay: number = 500,
): void => {
  // eslint-disable-next-line no-debugger
  debugger;
  event.preventDefault();
  event.stopPropagation();
  const debouncedCallback = debounce(callback, delay);
  debouncedCallback(event, ...([] as unknown[]));
};

export default mouseHandler;
