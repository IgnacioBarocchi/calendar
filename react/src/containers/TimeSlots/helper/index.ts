import { CalendarEvent } from '../../../store/@types';
import { MouseEvent } from 'react';
import { getDefaultDateTimeValue } from '../../../components/EventCreationModal/helper';
import { updateEventCreationModalState } from '../../../store/actions';

export const getActionFrom = (event: MouseEvent, timeSlotDate: Date) => {
  return updateEventCreationModalState(
    {
      isOpen: true,
      position: {
        xRate: event.clientX,
        yRate: event.clientY,
      },
      initialFormValues: {
        title: `no title ${timeSlotDate.getHours()}`,
        type: 'draft',
        start: getDefaultDateTimeValue(timeSlotDate),
        end: getDefaultDateTimeValue(timeSlotDate, true),
        description: '',
      },
    },
    true,
  );
};

export const getEventCSSValues = (
  start: Date,
  end: Date,
  timeSlotDate: Date,
  parentHeight: number,
): [number, number] => {
  const startDateTime = new Date(start);

  const timeDifference = startDateTime.valueOf() - new Date(end).valueOf();

  const secondsLong = Math.abs(Math.floor(timeDifference / 1000));
  const eventHeightPercentage =
    ((secondsLong * 100) / (3600 * parentHeight)) * 100;

  const timeDifferenceMinutes =
    (startDateTime.valueOf() - timeSlotDate.valueOf()) / (1000 * 60);

  const eventTopPosition =
    timeDifferenceMinutes < 0 ? 0 : (timeDifferenceMinutes / 60) * 100;

  return [eventHeightPercentage, eventTopPosition];
};

export const getDateTimeString = (calendarEventRecord: CalendarEvent) => {
  const startDate = new Date(calendarEventRecord.start);
  const endDate = new Date(calendarEventRecord.end);

  const startTimeString = `${startDate.getHours()}:${String(
    startDate.getMinutes(),
  ).padStart(2, '0')}`;

  const endHours = endDate.getHours();

  const endTimeString = `${endDate.getHours()}:${String(
    endDate.getMinutes(),
  ).padStart(2, '0')}${endHours >= 12 ? 'pm' : 'am'}`;

  return `, ${startTimeString} - ${endTimeString}`;
};
