import { ControlledDraftEvent } from '../../components/EventCreationModal/helper';

export interface RootState {
  week: [Date, Date, Date, Date, Date, Date, Date];
  events: CalendarEvent[];
  eventCerationModalState: {
    isOpen: boolean;
    initialFormValues: DraftEvent | ControlledDraftEvent;
  };
  eventDetailsModalIsOpen: { isOpen: boolean };
}

export const ActionTypes = {
  GET_NEXT_WEEK: 'GET_NEXT_WEEK',
  GET_PREVIOUS_WEEK: 'GET_PREVIOUS_WEEK',
  GET_ONGOING_WEEK: 'GET_ONGOING_WEEK',
  GET_WEEK_FROM_DATE: 'GET_WEEK_FROM_DATE',
  CREATE_EVENT: 'CREATE_EVENT',
  UPDATE_EVENT_CREATION_MODAL_STATE: 'UPDATE_EVENT_CREATION_MODAL_STATE',
  UPDATE_EVENT_DETAILS_MODAL_STATE: 'UPDATE_EVENT_DETAILS_MODAL_STATE',
} as const;

export interface DraftEvent {
  title?: string;
  type: 'draft' | 'upcoming';
  description?: string;
  start: Date;
  end: Date;
}
export interface CalendarEvent extends DraftEvent {
  id: string;
  title: string;
}

export interface Action {
  payload?: { calendarEvent?: CalendarEvent; date?: Date; isOpen?: boolean };
  type: string;
}
