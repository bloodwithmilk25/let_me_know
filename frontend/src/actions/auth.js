import authApi from "../api/authApi";
import to from "await-to-js";
import {
  SIGN_IN,
  SIGN_OUT,
  FETCH_USER,
  UPDATE_USER,
  REGISTER,
  CHANGE_PASSWORD,
  RESET_PASSWORD,
  CLEAR_NOTIFICATIONS,
  CLEAR_ERRORS
} from "./types";
import history from "../history";

export const signIn = data => async dispatch => {
  let error, response;
  [error, response] = await to(authApi.post("login/", data));

  dispatch({
    type: SIGN_IN,
    payload: response ? response : error.response
  });
};

export const signOut = () => dispatch => {
  authApi.post("logout/");

  dispatch({ type: SIGN_OUT });
  dispatch({ type: CLEAR_NOTIFICATIONS });
};

export const fetchUser = () => async dispatch => {
  const response = await authApi.get("user/");

  dispatch({ type: FETCH_USER, payload: response.data });
};

export const updateUser = data => async dispatch => {
  let error, response;
  [error, response] = await to(authApi.patch("user/", data));

  dispatch({
    type: UPDATE_USER,
    payload: response ? response : error.response
  });
};

export const register = data => async dispatch => {
  let error, response;
  [error, response] = await to(authApi.post("registration/", data));

  dispatch({
    type: REGISTER,
    payload: response ? response : error.response
  });
};

export const changePassword = data => async dispatch => {
  await authApi.post("password/change/", data);

  dispatch({ type: CHANGE_PASSWORD });
};

export const resetPassword = data => async dispatch => {
  authApi.post("password/reset/", data);

  dispatch({ type: RESET_PASSWORD });
  history.push("/email-was-sent");
};
export const confrimResetPassword = data => async dispatch => {
  authApi.post("password/reset/confirm/", data);

  dispatch({ type: RESET_PASSWORD });
  history.push("/");
};

export const clearErrors = () => {
  return { type: CLEAR_ERRORS };
};
