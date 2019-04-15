import React from "react";
import { Router, Route } from "react-router-dom";

import NotificationsList from "./notifications/NotificationsList";
import Header from "./Header";
import Auth from "./auth/Auth";
import ResetPasswordConfirmForm from "./auth/ResetPasswordConfirmForm";
import DisplayMessage from "./auth/DisplayMessage";
import history from "../history";
import injectSheet from "react-jss";
import styles from "./AppStyles";

const App = () => {
  return (
    <div>
      <Router history={history}>
        <Header />
        <div className="ui container">
          <Route path="/" exact component={Auth} />
          <Route path="/" exact component={NotificationsList} />
          <Route path="/email-was-sent" exact component={DisplayMessage} />
          <Route
            path="/password-reset/:uid/:token"
            exact
            component={ResetPasswordConfirmForm}
          />
        </div>
      </Router>
    </div>
  );
};

const styledApp = injectSheet(styles)(App);

export default styledApp;
