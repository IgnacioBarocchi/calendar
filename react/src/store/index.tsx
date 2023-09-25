import { Action, ActionTypes, RootState } from './@types';
import {
  calculateNextWeek,
  calculatePreviousWeek,
  getWeekFrom,
} from '../lib/weekHelper';

import { legacy_createStore as createStore } from 'redux';

const ongoingWeek = getWeekFrom(new Date());
const initialState = {
  week: ongoingWeek,
};

const reducer = (state: RootState = initialState, action: Action) => {
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
        week: getWeekFrom(payload.date),
      };
    //   ill add this later on.
    // case ActionTypes.CREATE_EVENT:
    //   const { newEvent } = action.payload;
    //   return {
    //     ...state,
    //     events: [...state.events, newEvent],
    //   };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
