import { ActionTypes, CalendarEvent } from '../../store/@types';
import { CalendarCell, Text } from '../../components/UI';
import {
  FC,
  MouseEvent,
  Suspense,
  lazy,
  useEffect,
  useRef,
  useState,
} from 'react';

import { desktopGeneric } from '../../constants/theme';
import { getActionFrom } from './helper';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';

const CalendarEventView = lazy(() => import('./CalendarEventView'));

export const TimeSlot: FC<{
  timeSlotDate: Date;
  calendarEvents?: CalendarEvent[];
}> = ({ timeSlotDate, calendarEvents }) => {
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
    dispatch(getActionFrom(event, timeSlotDate));
  };

  const handleOpenDetailsModalClick = (
    mouseEvent: MouseEvent,
    calendarEventRecord: CalendarEvent,
  ) => {
    dispatch({
      type: ActionTypes.UPDATE_EVENT_DETAILS_MODAL_STATE,
      payload: {
        isOpen: true,
        calendarEventRecord,
        position: {
          xRate: mouseEvent.clientX,
          yRate:
            mouseEvent.clientY -
            (Number(desktopGeneric.size.modalHeight.replace('vh', '')) *
              window.innerHeight) /
              100,
        },
      },
    });
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

// import { ActionTypes, CalendarEvent } from '../../store/@types';
// import { FC, MouseEvent, useEffect, useRef, useState } from 'react';

// import { CalendarCell } from '../../components/UI';
// import { getActionFrom } from './helper';
// import { nanoid } from 'nanoid';
// import { useDispatch } from 'react-redux';

// const CalendarEventView = React.lazy(() => import('./CalendarEventView'));

// export const TimeSlot: FC<{
//   timeSlotDate: Date;
//   calendarEvents?: CalendarEvent[];
// }> = ({ timeSlotDate, calendarEvents }) => {
//   // ... (rest of your component code)

//   return (
//     <CalendarCell
//       location={'body'}
//       onClick={handleOpenModalClick}
//       ref={elementRef}
//     >
//       {calendarEvents?.length &&
//         calendarEvents.map((calendarEventRecord, i) => {
//           return (
//             <React.Suspense fallback={<div>Loading...</div>} key={nanoid()}>
//               <CalendarEventView
//                 parentHeight={timeSlotPixelsHeight}
//                 parentWidth={timeSlotPixelsWidth}
//                 timeSlotDate={timeSlotDate}
//                 calendarEventRecord={calendarEventRecord}
//                 index={i}
//                 maxIndex={calendarEvents.length}
//                 onClick={(event: MouseEvent<Element, globalThis.MouseEvent>) => {
//                   handleOpenDetailsModalClick(event, calendarEventRecord);
//                 }}
//               />
//             </React.Suspense>
//           );
//         })}
//     </CalendarCell>
//   );
// };
