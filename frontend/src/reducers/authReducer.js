import {
  SIGN_IN,
  SIGN_OUT,
  FETCH_USER,
  UPDATE_USER,
  REGISTER,
  CHANGE_PASSWORD,
  RESET_PASSWORD,
  CONFIRM_RESET_PASSWORD,
  CLEAR_ERRORS
} from "../actions/types";

const INITIAL_STATE = {
  isSignedIn: false,
  errors: {},
  showLoginModal: false,
  showRegisterModal: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      if (action.payload.status !== 200) {
        return {
          errors: action.payload.data,
          isSignedIn: false
        };
      }
      return { ...state, ...action.payload.data.user, isSignedIn: true };

    case SIGN_OUT:
      return { isSignedIn: false };
    case FETCH_USER:
      return { ...state, ...action.payload, isSignedIn: true };

    case UPDATE_USER:
      if (action.payload.status !== 200) {
        return {
          ...state,
          errors: { ...state.errors, update: action.payload.data }
        };
      }
      return { ...state, ...action.payload.data };

    case REGISTER:
      if (action.payload.status !== 201) {
        return {
          errors: action.payload.data,
          isSignedIn: false
        };
      }
      return { ...action.payload.data.user, isSignedIn: true };

    case CHANGE_PASSWORD:
      if (action.payload.status !== 200) {
        return {
          ...state,
          errors: { ...state.errors, password: action.payload.data }
        };
      }
      return state;

    case RESET_PASSWORD:
      return state;

    case CONFIRM_RESET_PASSWORD:
      if (action.payload.status !== 200) {
        return {
          errors: action.payload.data
        };
      }
      return state;

    case CLEAR_ERRORS:
      return { ...state, errors: {} };

    default:
      return state;
  }
};
