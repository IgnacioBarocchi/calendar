import { CalendarCell, Text } from '../../components/UI';
import { CalendarEvent, RootState } from '../../store/@types';
import {
  FC,
  MouseEvent,
  Suspense,
  lazy,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getActionFrom } from './helper';
import { nanoid } from 'nanoid';
import { updateEventDetailsModalState } from '../../store/actions';

const CalendarEventView = lazy(() => import('./CalendarEventView'));

export const TimeSlot: FC<{
  timeSlotDate: Date;
  calendarEvents?: CalendarEvent[];
}> = ({ timeSlotDate, calendarEvents }) => {
  const experimentalFeatures = useSelector(
    (state: RootState) => state.experimentalFeatures,
  );
  const dispatch = useDispatch();
  const [timeSlotPixelsHeight, setTimeSlotPixelsHeight] = useState(0);
  const [timeSlotPixelsWidth, setTimeSlotPixelsWidth] = useState(0);

  const elementRef = useRef<typeof CalendarCell & HTMLDivElement>(null);

  const handleResize = () => {
    if (!elementRef?.current) return;
    setTimeSlotPixelsHeight(elementRef.current.offsetHeight);
    setTimeSlotPixelsWidth(elementRef.current.offsetWidth);
  };

  useEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleOpenModalClick = (event: MouseEvent) => {
    const p = getActionFrom(event, timeSlotDate);
    console.log('this will populate form data', p);

    dispatch(p);
  };

  const handleOpenDetailsModalClick = (
    mouseEvent: MouseEvent,
    calendarEventRecord: CalendarEvent,
  ) => {
    dispatch(
      updateEventDetailsModalState(
        {
          isOpen: true,
          calendarEventRecord,
          position: {
            xRate: mouseEvent.clientX,
            yRate: mouseEvent.clientY,
          },
        },
        true,
      ),
    );
  };

  return (
    <CalendarCell
      location={'body'}
      onClick={handleOpenModalClick}
      ref={elementRef}
    >
      {calendarEvents?.length &&
        calendarEvents.map((calendarEventRecord, i) => {
          return (
            <Suspense
              fallback={<Text size="m">[{calendarEventRecord.title}]</Text>}
              key={nanoid()}
            >
              <CalendarEventView
                use_experimental_drag_events={experimentalFeatures}
                parentHeight={timeSlotPixelsHeight}
                parentWidth={timeSlotPixelsWidth}
                timeSlotDate={timeSlotDate}
                calendarEventRecord={calendarEventRecord}
                index={i}
                maxIndex={calendarEvents.length}
                onClick={(
                  event: MouseEvent<Element, globalThis.MouseEvent>,
                ) => {
                  handleOpenDetailsModalClick(event, calendarEventRecord);
                }}
              />
            </Suspense>
          );
        })}
    </CalendarCell>
  );
};
