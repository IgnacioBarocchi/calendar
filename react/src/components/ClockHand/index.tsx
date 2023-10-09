import { useEffect, useRef, useState } from 'react';

import { ClockHandContainer } from './ClockHandElements';
import { RootState } from '../../store/@types';
import { getClockHandData } from './helper';
import { useSelector } from 'react-redux';

const ClockHand = () => {
  const week = useSelector((state: RootState) => state.week);

  const [clockData, setClockData] = useState(getClockHandData(week));

  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;

      if (deltaTime >= 3000) {
        setClockData(getClockHandData(week));
        previousTimeRef.current = time;
      }
    } else {
      previousTimeRef.current = time;
    }

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(requestRef?.current);
  }, []);

  return <ClockHandContainer clockHandData={clockData} />;
};

export default ClockHand;
// const clockHandData = useMemo(
//   () => getClockHandData(week),
//   [week[0].toDateString()],
// );

// if (!clockHandData) {
//   return null;
// }
// !before
/*
import { getClockHandPosition, getTimeSlotPixelsWidth } from './helper';
import { useEffect, useState } from 'react';

import { ClockHandContainer } from './ClockHandElements';
import { RootState } from '../../store/@types';
import { useSelector } from 'react-redux';

const ClockHand = () => {
  const week = useSelector((state: RootState) => state.week);
  const [position, setPosition] = useState(getClockHandPosition(week));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPosition(getClockHandPosition(week));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [week]);

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
*/
