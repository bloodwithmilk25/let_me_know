import notificationsApi from "../api/notificationsApi";
import {
  FETCH_NOTIFICATIONS,
  CREATE_NOTIFICATION,
  UPDATE_NOTIFICATION,
  DELETE_NOTIFICATION,
  CLEAR_NOTIFICATIONS,
  PUT_ON_EDIT,
  CLOSE_EDIT
} from "../actions/types";

export const fetchNotifications = () => async dispatch => {
  const response = await notificationsApi.get("/");

  dispatch({ type: FETCH_NOTIFICATIONS, payload: response.data });
};

export const createNotification = data => async dispatch => {
  const response = await notificationsApi.post("/", data);

  dispatch({ type: CREATE_NOTIFICATION, payload: response.data });
};

export const updateNotification = (id, data) => async dispatch => {
  const response = await notificationsApi.patch(`/${id}/`, data);

  dispatch({ type: UPDATE_NOTIFICATION, payload: response.data });
};

export const deleteNotification = id => async dispatch => {
  const response = await notificationsApi.delete(`/${id}`);

  dispatch({ type: DELETE_NOTIFICATION, payload: response, id });
};

export const clearNotifications = () => {
  return { type: CLEAR_NOTIFICATIONS };
};

export const putOnEdit = id => {
  return { type: PUT_ON_EDIT, payload: id };
};
export const closeEdit = () => {
  return { type: CLOSE_EDIT };
};
