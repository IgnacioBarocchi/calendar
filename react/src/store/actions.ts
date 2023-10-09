import {
  ActionTypes,
  CalendarEvent,
  DraftEvent,
  EventCerationModalState,
  EventDetailsModalState,
  Holiday,
} from './@types';

import { Position } from '../components/Modal';
import { desktopGeneric } from '../constants/theme';

const getNormalizeModalPosition = (position: Position) => {
  const maxLeft =
    position.yRate -
    (Number(desktopGeneric.size.headerHeight.replace('vh', '')) *
      window.innerHeight) /
      100;

  const maxTop =
    position.xRate -
    (Number(desktopGeneric.size.asideWidth.replace('vw', '')) *
      window.innerWidth) /
      100;

  position.yRate = Math.min(Math.max(0, position.yRate), maxLeft);
  position.xRate = Math.min(Math.max(0, position.xRate), maxTop);
  return position;
};

export const updateAsideState = () => ({
  type: ActionTypes.UPDATE_ASIDE_STATE,
});

export const createEvent = (event: DraftEvent) => ({
  type: ActionTypes.CREATE_EVENT,
  payload: event,
});

export const updateEventCreationModalState = (
  state: EventCerationModalState,
  shouldNormalize: boolean,
) => {
  if (shouldNormalize) {
    state.position = getNormalizeModalPosition(state.position);
  }

  return {
    type: ActionTypes.UPDATE_EVENT_CREATION_MODAL_STATE,
    payload: state,
  };
};

export const updateEventDetailsModalState = (
  state: EventDetailsModalState,
  shouldNormalize: boolean,
) => {
  if (shouldNormalize) {
    state.position = getNormalizeModalPosition(state.position);
  }

  return {
    type: ActionTypes.UPDATE_EVENT_DETAILS_MODAL_STATE,
    payload: state,
  };
};

export const setWeekEvents = (events: CalendarEvent[]) => ({
  type: ActionTypes.SET_WEEK_EVENTS,
  payload: events,
});

export const deleteEvent = (calendarEvent: CalendarEvent) => ({
  type: ActionTypes.DELETE_EVENT,
  payload: calendarEvent,
});

export const toggleTheme = () => ({
  type: ActionTypes.TOGGLE_THEME,
});

export const setHolidays = (holidays: Holiday[] | undefined) => ({
  type: ActionTypes.SET_HOLIDAYS,
  payload: holidays,
});
// const normalizedXRate =
//   (Number(desktopGeneric.size.asideWidth.replace('vw', '')) *
//     window.innerWidth) /
//   100;
