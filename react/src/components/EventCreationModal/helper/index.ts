import { DraftEvent } from '../../../store/@types';

export interface Actions {
  type: string;
  payload: string | Date;
}

export interface ControlledDraftEvent
  extends Omit<DraftEvent, 'start' | 'end'> {
  start: Date | string;
  end: Date | string;
}

export const formReducer = (
  state: DraftEvent | ControlledDraftEvent,
  action: Actions,
): DraftEvent => {
  const { payload } = action;
  if (!payload) return state;

  // ! ??????
  //   if (
  //     ['SET_START_DATETIME', 'SET_END_DATETIME'].includes(action.type) &&
  //     !(payload instanceof Date)
  //   )
  //     return state;

  switch (action.type) {
    case 'SET_TITLE':
      return { ...state, title: payload as unknown as string };
    case 'SET_START':
      // todo: remove casting
      return { ...state, start: payload as unknown as Date };
    case 'SET_END':
      // todo: remove casting
      return { ...state, end: payload as unknown as Date };
    case 'SET_DESCRIPTION':
      return { ...state, description: payload as unknown as string };
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
  const wrongDateFormat = !(start instanceof Date) || !(end instanceof Date);

  if (requiredFieldsAreEmpty) throw new Error('Missing required fields');
  if (wrongDateFormat) throw new Error('Wrong date format');
  //   if (
  //     formatDateToDateInputValue(start) ===
  //     formatDateToDateInputValue(end)
  //   )
  //     throw new Error('The start date cannot be equal to the end date');
  //   if (start > end)
  //     throw new Error('The start date cannot be greater than the end date');

  return true;
};

export const parseDateRecordValue = (value: string | Date): Date => {
  return typeof value === 'string' ? new Date(value) : value;
};

export const formatDateToDateInputValue = (value: string | Date): string => {
  return typeof value === 'string'
    ? value
    : new Date(value.toString().split('GMT')[0] + ' UTC')
        .toISOString()
        .split('.')[0];
};
