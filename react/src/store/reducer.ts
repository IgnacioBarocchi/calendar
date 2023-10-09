import { Action, ActionTypes, RootState } from './@types';
import {
  calculateNextWeek,
  calculatePreviousWeek,
  getWeekFrom,
} from '../lib/weekHelper';

const ongoingWeek = getWeekFrom(new Date());

const initialState = {
  week: ongoingWeek,
  selectedTheme: 'dark',
  weekEvents: [],
  experimentalFeatures: false,
  asideIsHidden: false,
  eventCerationModalState: {
    isOpen: false,
    initialFormValues: {},
  },
  eventDetailsModalState: {
    isOpen: false,
    calendarEventRecord: {},
    position: {
      xRate: 0,
      yRate: 0,
    },
  },
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const reducer = (
  state: RootState = initialState,
  action: Action,
): RootState => {
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
      if (!payload || !(payload instanceof Date)) {
        throw new Error(`Date is missing`);
      }
      return {
        ...state,
        week: getWeekFrom(payload),
      };
    case ActionTypes.UPDATE_EVENT_CREATION_MODAL_STATE:
      return {
        ...state,
        eventCerationModalState: payload,
      };
    case ActionTypes.UPDATE_EVENT_DETAILS_MODAL_STATE:
      return {
        ...state,
        eventDetailsModalState: payload,
      };
    case ActionTypes.SET_HOLIDAYS:
      return {
        ...state,
        holidays: payload,
      };
    case ActionTypes.SET_WEEK_EVENTS:
      return {
        ...state,
        weekEvents: payload,
      };
    case ActionTypes.DELETE_EVENT:
      return {
        ...state,
        weekEvents: state.weekEvents.filter((event) => payload !== event.id),
      };
    case ActionTypes.TOGGLE_THEME:
      return {
        ...state,
        selectedTheme: state.selectedTheme === 'light' ? 'dark' : 'light',
      };

    case ActionTypes.TOGGLE_EXPERIMENTAL_FEATURES:
      return {
        ...state,
        experimentalFeatures: !state.experimentalFeatures,
      };
    case ActionTypes.UPDATE_ASIDE_STATE:
      return {
        ...state,
        asideIsHidden: !state.asideIsHidden,
      };
    default:
      return state;
  }
};
