import { ActionTypes } from '../../../store/@types';
import { formatDateToDateInputValue } from '../../../components/EventCreationModal/helper';

const getDefaultDateTimeValue = (
  date: Date,
  add30: boolean = false,
): string => {
  if (add30) {
    date.setHours(date.getHours(), 30, 0);
  }

  return formatDateToDateInputValue(date);
};

export const getActionFrom = (timeSlotDate: Date) => ({
  type: ActionTypes.UPDATE_EVENT_CREATION_MODAL_STATE,
  payload: {
    isOpen: true,
    initialFormValues: {
      title: `no title ${timeSlotDate.getHours()}`,
      type: 'draft',
      start: getDefaultDateTimeValue(timeSlotDate),
      end: getDefaultDateTimeValue(timeSlotDate, true),
      description: '',
    },
  },
});
