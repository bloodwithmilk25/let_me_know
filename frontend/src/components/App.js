import React from "react";
import injectSheet from "react-jss";
import { Router, Route } from "react-router-dom";

import Header from "./Header";
import history from "../history";
import styles from "./styles/AppStyles";
import UpdateUserForm from "./auth/UpdateUserForm";
import DisplayMessage from "./auth/DisplayMessage";
import NotificationsList from "./notifications/NotificationsList";
import ResetPasswordConfirmForm from "./auth/ResetPasswordConfirmForm";

const App = props => {
  return (
    <Router history={history}>
      <div className={props.classes.cont}>
        <Header />
        <div className={props.classes.main}>
          <Route path="/" exact component={NotificationsList} />
          <Route path="/update-user" exact component={UpdateUserForm} />
          <Route path="/email-was-sent" exact component={DisplayMessage} />
          <Route
            path="/password-reset/:uid/:token"
            exact
            component={ResetPasswordConfirmForm}
          />
        </div>
      </div>
    </Router>
  );
};

const styledApp = injectSheet(styles)(App);

export default styledApp;
