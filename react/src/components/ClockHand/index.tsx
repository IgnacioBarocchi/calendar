import { ClockHandContainer } from './ClockHandElements';
import { RootState } from '../../store/@types';
import { getClockHandData } from './helper';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const ClockHand = () => {
  const week = useSelector((state: RootState) => state.week);
  const clockHandData = useMemo(
    () => getClockHandData(week),
    [week[0].toDateString()],
  );

  if (!clockHandData) {
    return null;
  }

  return <ClockHandContainer clockHandData={clockHandData} />;
};

export default ClockHand;

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
