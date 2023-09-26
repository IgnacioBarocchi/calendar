export interface RootState {
  week: [Date, Date, Date, Date, Date, Date, Date];
  events: CalendarEvent[];
  eventCerationModalIsOpen: boolean;
  eventDetailsModalIsOpen: boolean;
}

export const ActionTypes = {
  GET_NEXT_WEEK: 'GET_NEXT_WEEK',
  GET_PREVIOUS_WEEK: 'GET_PREVIOUS_WEEK',
  GET_ONGOING_WEEK: 'GET_ONGOING_WEEK',
  GET_WEEK_FROM_DATE: 'GET_WEEK_FROM_DATE',
  CREATE_EVENT: 'CREATE_EVENT',
  UPDATE_EVENT_CREATION_MODAL_VISIBILITY:
    'UPDATE_EVENT_CREATION_MODAL_VISIBILITY',
  UPDATE_EVENT_DETAILS_MODAL: 'UPDATE_EVENT_CREATION_MODAL_VISIBILITY',
} as const;

export interface CalendarEvent {
  id: string;
  title: string;
  type: 'draft' | 'upcoming';
  description?: string;
  start: Date;
  end: Date;
}

export interface Action {
  payload?: { calendarEvent?: CalendarEvent; date?: Date; isOpen?: boolean };
  type: string;
}
