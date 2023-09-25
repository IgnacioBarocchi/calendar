export interface RootState {
  week: Date[];
}

export const ActionTypes = {
  GET_NEXT_WEEK: 'GET_NEXT_WEEK',
  GET_PREVIOUS_WEEK: 'GET_PREVIOUS_WEEK',
  GET_ONGOING_WEEK: 'GET_ONGOING_WEEK',
  GET_WEEK_FROM_DATE: 'GET_WEEK_FROM_DATE',
  CREATE_EVENT: 'CREATE_EVENT',
} as const;

export interface CalendarEvent {
  id: string;
  title: string;
  type: 'draft' | 'upcoming';
  description: string;
  start: Date;
  end: Date;
}

export interface Action {
  payload: { calendarEvent: CalendarEvent } | { date: Date };
  type: string;
}
