import { ActionTypes } from '../../../store/@types';
import { MouseEvent } from 'react';
import { getDefaultDateTimeValue } from '../../../components/EventCreationModal/helper';

export const getActionFrom = (event: MouseEvent, timeSlotDate: Date) => ({
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
});
