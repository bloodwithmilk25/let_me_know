import notificationsApi from "../api/notificationsApi";
import {
  FETCH_NOTIFICATIONS,
  CREATE_NOTIFICATION,
  EDIT_NOTIFICATION,
  DELETE_NOTIFICATION,
  CLEAR_NOTIFICATIONS
} from "../actions/types";

export const fetchNotifications = () => async dispatch => {
  const response = await notificationsApi.get("/");

  dispatch({ type: FETCH_NOTIFICATIONS, payload: response.data });
};

export const createNotification = data => async dispatch => {
  const response = await notificationsApi.post("/", data);

  dispatch({ type: CREATE_NOTIFICATION, payload: response.data });
};

export const editNotification = (id, data) => async dispatch => {
  const response = await notificationsApi.patch(`/${id}/`, data);

  dispatch({ type: EDIT_NOTIFICATION, payload: response.data });
};

export const deleteNotification = id => async dispatch => {
  const response = await notificationsApi.delete(`/${id}`);

  dispatch({ type: DELETE_NOTIFICATION, payload: response.data });
};

export const clearNotifications = () => {
  return { type: CLEAR_NOTIFICATIONS };
};
