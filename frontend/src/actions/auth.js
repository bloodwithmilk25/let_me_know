import authApi from "../api/authApi";
import {
  SIGN_IN,
  SIGN_OUT,
  FETCH_USER,
  REGISTER,
  CHANGE_PASSWORD,
  RESET_PASSWORD,
  CLEAR_NOTIFICATIONS
} from "./types";

export const sign_in = data => async dispatch => {
  const response = await authApi.post("login/", data);

  dispatch({ type: SIGN_IN, payload: response.data.user });
};

export const sign_out = () => dispatch => {
  authApi.post("logout/");

  dispatch({ type: SIGN_OUT });
  dispatch({ type: CLEAR_NOTIFICATIONS });
};

export const fetchUser = () => async dispatch => {
  const response = await authApi.get("user/");

  dispatch({ type: FETCH_USER, payload: response.data });
};

export const register = data => async dispatch => {
  const response = await authApi.post("registration/", data);

  dispatch({ type: REGISTER, payload: response.data });
};

export const changePassword = data => async dispatch => {
  await authApi.post("password/change/", data);

  dispatch({ type: CHANGE_PASSWORD });
};

export const resetPassword = data => async dispatch => {
  authApi.post("password/reset/", data);

  dispatch({ type: RESET_PASSWORD });
};
