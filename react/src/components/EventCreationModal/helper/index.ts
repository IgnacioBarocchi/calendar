import { DraftEvent } from '../../../store/@types';

export const formReducer = (state: DraftEvent, action) => {
  switch (action.type) {
    case 'SET_TITLE':
      return { ...state, title: action.payload };
    case 'SET_START_DATETIME':
      return { ...state, startDateTime: action.payload };
    case 'SET_END_DATETIME':
      return { ...state, endDateTime: action.payload };
    case 'SET_DESCRIPTION':
      return { ...state, description: action.payload };
    default:
      return state;
  }
};

export const eventIsValid = (
  title: DraftEvent['title'],
  startDateTime: DraftEvent['start'],
  endDateTime: DraftEvent['end'],
) => {
  const requiredFieldsAreEmpty = !title || !startDateTime || !endDateTime;
  const wrongDateFormat =
    !(startDateTime instanceof Date) || !(endDateTime instanceof Date);

  if (requiredFieldsAreEmpty) throw new Error('Missing required fields');
  if (wrongDateFormat) throw new Error('Wrong date format');
  //   if (
  //     formatDateToDateInputValue(startDateTime) ===
  //     formatDateToDateInputValue(endDateTime)
  //   )
  //     throw new Error('The start date cannot be equal to the end date');
  //   if (startDateTime > endDateTime)
  //     throw new Error('The start date cannot be greater than the end date');

  return true;
};
