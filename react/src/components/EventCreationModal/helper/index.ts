import { ActionTypes, CalendarEvent, DraftEvent } from '../../../store/@types';
import { getWeekEvents, postEvent } from '../../../services/events.service';

import { AnyAction } from 'redux';
import { Dispatch } from 'react';
import { Week } from '../../../lib/weekHelper';

const isDate = (value: string | Date): boolean => value instanceof Date;

export const formReducer = (state: DraftEvent, action: Actions): DraftEvent => {
  const { payload } = action;
  if (!payload) return state;

  switch (action.type) {
    case 'SET_TITLE':
      return { ...state, title: String(payload) };
    case 'SET_START':
      return { ...state, start: parseDateRecordValue(payload) };
    case 'SET_END':
      return { ...state, end: parseDateRecordValue(payload) };
    case 'SET_DESCRIPTION':
      return { ...state, description: String(payload) };
    default:
      return state;
  }
};

export const eventIsValid = (
  title: DraftEvent['title'],
  start: DraftEvent['start'],
  end: DraftEvent['end'],
) => {
  const requiredFieldsAreEmpty = !title || !start || !end;
  const wrongDateFormat = !isDate(start) || !isDate(end);

  if (requiredFieldsAreEmpty) throw new Error('Missing required fields');

  if (wrongDateFormat) throw new Error('Wrong date format');

  if (start.toISOString() === end.toISOString())
    throw new Error('The start date cannot be equal to the end date');

  if (start.toISOString() > end.toISOString())
    throw new Error('The start date cannot be greater than the end date');

  return true;
};

export const parseDateRecordValue = (value: string | Date): Date => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return isDate(value) ? value : new Date(value);
};

export const formatDateToDateInputValue = (value: string | Date): string => {
  return typeof value === 'string'
    ? value
    : new Date(value.toString().split('GMT')[0] + ' UTC')
        .toISOString()
        .split('.')[0];
};

export const getDefaultDateTimeValue = (
  date: Date,
  add30: boolean = false,
): string => {
  if (add30) {
    date.setHours(date.getHours(), 30, 0);
  }

  return formatDateToDateInputValue(date);
};

export const closeModal = (dispatch: Dispatch<AnyAction>) => {
  dispatch({
    type: ActionTypes.UPDATE_EVENT_CREATION_MODAL_STATE,
    payload: {
      isOpen: false,
      initialFormValues: {
        id: 'tmp',
        title: '',
        type: 'draft',
        start: '',
        end: '',
        description: '',
      },
    },
  });
};

export const fetchWeekEvents = async (
  dispatch: Dispatch<AnyAction>,
  week: Week,
) => {
  dispatch({
    type: ActionTypes.SET_WEEK_EVENTS,
    payload: await getWeekEvents(week),
  });

  closeModal(dispatch);
};

export const postCalendarEvent = async (
  calendarEvent: CalendarEvent,
  dispatch: Dispatch<AnyAction>,
  week: Week,
) => {
  try {
    const response = await postEvent(calendarEvent);

    if (response?.id !== 'temp') {
      fetchWeekEvents(dispatch, week);
    }
  } catch (error) {
    // todo: use toast of something
    console.error(error);
  }
};
export interface Actions {
  type: string;
  payload: string | Date;
}

export interface ControlledDraftEvent
  extends Omit<DraftEvent, 'start' | 'end'> {
  start: Date | string;
  end: Date | string;
}
