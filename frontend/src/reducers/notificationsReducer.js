import {
  FETCH_NOTIFICATIONS,
  CREATE_NOTIFICATION,
  UPDATE_NOTIFICATION,
  DELETE_NOTIFICATION,
  CLEAR_NOTIFICATIONS
} from "../actions/types";

const INITIAL_STATE = {
  list: [],
  isFetched: false,
  isUnderEdit: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_NOTIFICATIONS:
      return { ...state, list: action.payload, isFetched: true };
    case CREATE_NOTIFICATION:
      return { ...state, list: [...state.list, action.payload] };
    case UPDATE_NOTIFICATION:
      return {
        ...state,
        list: state.list.map(el =>
          el.id === action.payload.id ? action.payload : el
        )
      };
    case DELETE_NOTIFICATION:
      return {
        ...state,
        list: state.list.filter(el => el.id !== action.payload.id)
      };
    // handle case when user signes off
    case CLEAR_NOTIFICATIONS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
