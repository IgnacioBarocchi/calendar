import { ActionTypes } from '../../../store/@types';
import { getDefaultDateTimeValue } from '../../../components/EventCreationModal/helper';

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
