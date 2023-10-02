import { getClockHandPosition, getTimeSlotPixelsWidth } from './helper';
import { useEffect, useState } from 'react';

import { ClockHandContainer } from './ClockHandElements';
import { RootState } from '../../store/@types';
import { useSelector } from 'react-redux';

const ClockHand = () => {
  const week = useSelector((state: RootState) => state.week);
  const [position, setPosition] = useState(getClockHandPosition(week));

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setPosition(getClockHandPosition(week));
  //   }, 1000);

  //   return () => clearInterval(intervalId);
  // }, [week]);

  const [top, left] = position;

  return (
    <ClockHandContainer
      top={top}
      left={left}
      width={getTimeSlotPixelsWidth()}
    />
  );
};

export default ClockHand;
