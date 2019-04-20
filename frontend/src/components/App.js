import React from "react";
import { Router, Route } from "react-router-dom";

import NotificationsList from "./notifications/NotificationsList";
import Header from "./Header";
import ResetPasswordConfirmForm from "./auth/ResetPasswordConfirmForm";
import UpdateUserForm from "./auth/UpdateUserForm";
import DisplayMessage from "./auth/DisplayMessage";
import history from "../history";
import injectSheet from "react-jss";
import styles from "./styles/AppStyles";

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
