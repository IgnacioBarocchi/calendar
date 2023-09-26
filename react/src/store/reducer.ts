import { Action, ActionTypes, RootState } from './@types';
import {
  calculateNextWeek,
  calculatePreviousWeek,
  getWeekFrom,
} from '../lib/weekHelper';

import { getEventsFrom } from '../lib/eventsHelper';

const ongoingWeek = getWeekFrom(new Date());

const initialState = {
  week: ongoingWeek,
  weekEvents: getEventsFrom(ongoingWeek),
  eventCerationModalIsOpen: false,
  eventDetailsModalIsOpen: false,
};

export const reducer = (state: RootState = initialState, action: Action) => {
  const { payload } = action;

  switch (action.type) {
    case ActionTypes.GET_NEXT_WEEK:
      return {
        ...state,
        week: calculateNextWeek(state.week),
      };
    case ActionTypes.GET_PREVIOUS_WEEK:
      return {
        ...state,
        week: calculatePreviousWeek(state.week),
      };
    case ActionTypes.GET_ONGOING_WEEK:
      return {
        ...state,
        week: ongoingWeek,
      };
    case ActionTypes.GET_WEEK_FROM_DATE:
      if (!payload?.date) throw new Error(`Date is missing`);
      return {
        ...state,
        week: getWeekFrom(payload?.date),
      };
    case ActionTypes.UPDATE_EVENT_CREATION_MODAL_VISIBILITY:
      return {
        ...state,
        eventCerationModalIsOpen: payload?.isOpen,
      };
    default:
      return state;
  }
};
//   ill add this later on.
// case ActionTypes.CREATE_EVENT:
//   const { newEvent } = action.payload;
//   return {
//     ...state,
//     events: [...state.events, newEvent],
//   };
