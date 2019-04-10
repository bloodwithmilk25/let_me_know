import {
  FETCH_NOTIFICATIONS,
  CREATE_NOTIFICATION,
  UPDATE_NOTIFICATION,
  DELETE_NOTIFICATION,
  CLEAR_NOTIFICATIONS,
  PUT_ON_EDIT,
  CLOSE_EDIT
} from "../actions/types";

const INITIAL_STATE = {
  list: [],
  isFetched: false,
  notfUnderEdit: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_NOTIFICATIONS:
      return { ...state, list: action.payload, isFetched: true };
    case CREATE_NOTIFICATION:
      return { ...state, list: [action.payload, ...state.list] };
    case UPDATE_NOTIFICATION:
      return {
        ...state,
        list: state.list.map(el =>
          el.id === action.payload.id ? action.payload : el
        )
      };
    case DELETE_NOTIFICATION:
      if (action.payload.status === 204) {
        return {
          ...state,
          list: state.list.filter(el => el.id !== action.id)
        };
      }
      return state;
    case PUT_ON_EDIT:
      return { ...state, notfUnderEdit: action.payload };
    case CLOSE_EDIT:
      return { ...state, notfUnderEdit: null };
    // handle case when user signes off
    case CLEAR_NOTIFICATIONS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
