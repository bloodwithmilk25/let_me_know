import authApi from "../api/authApi";

export const login = data => async dispatch => {
  const response = await authApi.post("login", data);

  dispatch({ type: "LOGIN", payload: response.data });
};

export const logout = () => async dispatch => {
  const response = await authApi.post("logout");

  dispatch({ type: "LOGOUT" });
};

export const fetchUser = () => async dispatch => {
  const response = await authApi.get("user");

  dispatch({ type: "FETCH_USER", payload: response.data });
};

export const register = data => async dispatch => {
  const response = await authApi.post("registration/", data);

  dispatch({ type: "REGISTER", payload: response.data });
};

export const changePassword = data => async dispatch => {
  const response = await authApi.post("password/change", data);

  dispatch({ type: "CHANGE_PASSWORD" });
};

export const resetPassword = data => async dispatch => {
  const response = await authApi.post("password/reset", data);

  dispatch({ type: "RESET_PASSWORD" });
};
