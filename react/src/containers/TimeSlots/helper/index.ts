import { ActionTypes } from '../../../store/@types';
import { MouseEvent } from 'react';
import { getDefaultDateTimeValue } from '../../../components/EventCreationModal/helper';

export const getActionFrom = (event: MouseEvent, timeSlotDate: Date) => {
  JSON.stringify({
    xRate: event.clientX,
    yRate: event.clientY,
  });
  return {
    type: ActionTypes.UPDATE_EVENT_CREATION_MODAL_STATE,
    payload: {
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
  };
};

export const getMapKeyFrom = (date: Date) => {
  const matchingStartTime = new Date(date);
  matchingStartTime.setMinutes(0);
  matchingStartTime.setSeconds(0);
  matchingStartTime.setMilliseconds(0);

  return matchingStartTime.toISOString();
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
