import { ClockHandContainer } from './ClockHandElements';
import { RootState } from '../../store/@types';
import { getClockHandPosition } from './helper';
import { useSelector } from 'react-redux';

const ClockHand = () => {
  const week = useSelector((state: RootState) => state.week);
  const [top, left] = getClockHandPosition(week);
  return <ClockHandContainer top={top} left={left} />;
};

export default ClockHand;
