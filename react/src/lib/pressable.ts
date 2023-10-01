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

const pressableInterceptor = (
  event: MouseEvent,
  callback: (event: MouseEvent, ...rest: unknown[]) => void,
  delay: number = 500,
): void => {
  console.count('pressableInterceptor');
  event.preventDefault();
  event.stopPropagation();
  // const debouncedCallback = debounce(callback, delay);
  debounce(callback, delay)(event, ...([] as unknown[]));
};

export default pressableInterceptor;
