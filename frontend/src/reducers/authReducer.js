import {
  SIGN_IN,
  SIGN_OUT,
  FETCH_USER,
  REGISTER,
  CHANGE_PASSWORD,
  RESET_PASSWORD
} from "../actions/types";

const INITIAL_STATE = {
  isSignedIn: false,
  error: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      if (action.payload.status !== 200) {
        return {
          ...state,
          error: action.payload.data.non_field_errors,
          isSignedIn: false
        };
      }
      return { ...action.payload.data.user, isSignedIn: true };
    case SIGN_OUT:
      return { isSignedIn: false };
    case FETCH_USER:
      return { ...state, ...action.payload, isSignedIn: true };
    case REGISTER:
      return { ...action.payload.user, isSignedIn: true };
    case CHANGE_PASSWORD:
      return state;
    case RESET_PASSWORD:
      return state;
    default:
      return state;
  }
};
