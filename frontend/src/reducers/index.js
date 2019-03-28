import { combineReducers } from "redux";
import authReducer from "./authReducer";
import notificationsReducer from "./notificationsReducer";
// redux-form reducer
import { reducer as formReducer } from "redux-form";

export default combineReducers({
  user: authReducer,
  notifications: notificationsReducer,
  form: formReducer
});
