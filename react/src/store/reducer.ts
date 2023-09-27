import { Action, ActionTypes, RootState } from './@types';
import {
  calculateNextWeek,
  calculatePreviousWeek,
  getWeekFrom,
} from '../lib/weekHelper';

const ongoingWeek = getWeekFrom(new Date());

const initialState = {
  week: ongoingWeek,
  weekEvents: [],
  eventCerationModalState: { isOpen: false },
  eventDetailsModalIsOpen: { isOpen: false },
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
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
    case ActionTypes.UPDATE_EVENT_CREATION_MODAL_STATE:
      return {
        ...state,
        eventCerationModalState: payload,
      };
    case ActionTypes.FETCH_WEEK_EVENTS:
      return {
        ...state,
        weekEvents: payload,
      };
    default:
      return state;
  }
};
