import { ControlledDraftEvent } from '../../components/EventCreationModal/helper';
import { Position } from '../../components/Modal';
import theme from '../../constants/theme';

export interface RootState {
  week: [Date, Date, Date, Date, Date, Date, Date];
  weekEvents: CalendarEvent[];
  selectedTheme: keyof typeof theme;
  eventCerationModalState: {
    isOpen: boolean;
    initialFormValues: DraftEvent | ControlledDraftEvent;
    position: Position;
  };
  eventDetailsModalState: { isOpen: boolean; eventId: string };
}

export const ActionTypes = {
  GET_NEXT_WEEK: 'GET_NEXT_WEEK',
  GET_PREVIOUS_WEEK: 'GET_PREVIOUS_WEEK',
  GET_ONGOING_WEEK: 'GET_ONGOING_WEEK',
  GET_WEEK_FROM_DATE: 'GET_WEEK_FROM_DATE',
  CREATE_EVENT: 'CREATE_EVENT',
  UPDATE_EVENT_CREATION_MODAL_STATE: 'UPDATE_EVENT_CREATION_MODAL_STATE',
  UPDATE_EVENT_DETAILS_MODAL_STATE: 'UPDATE_EVENT_DETAILS_MODAL_STATE',
  FETCH_WEEK_EVENTS: 'FETCH_WEEK_EVENTS',
  DELETE_EVENT: 'DELETE_EVENT',
  TOGGLE_THEME: 'TOGGLE_THEME',
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
