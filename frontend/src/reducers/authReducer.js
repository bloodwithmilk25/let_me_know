import {
  SIGN_IN,
  SIGN_OUT,
  FETCH_USER,
  REGISTER,
  CHANGE_PASSWORD,
  RESET_PASSWORD
} from "../actions/types";

const INITIAL_STATE = {
  isSignedIn: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, ...action.payload, isSignedIn: true };
    case SIGN_OUT:
      return { isSignedIn: false };
    case FETCH_USER:
      return { ...state, ...action.payload, isSignedIn: true };
    case REGISTER:
      return action.payload;
    case CHANGE_PASSWORD:
      return state;
    case RESET_PASSWORD:
      return state;
    default:
      return state;
  }
};
