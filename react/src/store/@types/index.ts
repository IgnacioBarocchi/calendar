import { ControlledDraftEvent } from '../../components/EventCreationModal/helper';
import { Position } from '../../components/Modal';
import theme from '../../constants/theme';

interface ModalAgnosticState {
  isOpen: boolean;
  position: Position;
}
export interface EventCerationModalState extends ModalAgnosticState {
  initialFormValues: DraftEvent | ControlledDraftEvent;
}
export interface EventDetailsModalState extends ModalAgnosticState {
  calendarEventRecord: CalendarEvent;
}

export interface RootState {
  week: [Date, Date, Date, Date, Date, Date, Date];
  weekEvents: CalendarEvent[];
  holidays: Holiday[];
  asideIsHidden: boolean;
  selectedTheme: keyof typeof theme;
  eventCerationModalState: EventCerationModalState;
  eventDetailsModalState: EventDetailsModalState;
  experimentalFeatures: boolean;
}

export const ActionTypes = {
  UPDATE_ASIDE_STATE: 'UPDATE_ASIDE_STATE',
  GET_NEXT_WEEK: 'GET_NEXT_WEEK',
  GET_PREVIOUS_WEEK: 'GET_PREVIOUS_WEEK',
  GET_ONGOING_WEEK: 'GET_ONGOING_WEEK',
  GET_WEEK_FROM_DATE: 'GET_WEEK_FROM_DATE',
  CREATE_EVENT: 'CREATE_EVENT',
  UPDATE_EVENT_CREATION_MODAL_STATE: 'UPDATE_EVENT_CREATION_MODAL_STATE',
  UPDATE_EVENT_DETAILS_MODAL_STATE: 'UPDATE_EVENT_DETAILS_MODAL_STATE',
  SET_WEEK_EVENTS: 'SET_WEEK_EVENTS',
  DELETE_EVENT: 'DELETE_EVENT',
  TOGGLE_THEME: 'TOGGLE_THEME',
  TOGGLE_EXPERIMENTAL_FEATURES: 'TOGGLE_EXPERIMENTAL_FETURES',
  SET_HOLIDAYS: 'SET_HOLIDAYS',
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
export interface Holiday {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean | null;
  global: boolean | null;
  counties: boolean | null;
  launchYear: boolean | null;
  types: ['Public' | 'Private'];
}
