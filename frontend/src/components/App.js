import React from "react";
import { Router, Route } from "react-router-dom";
import NotificationsList from "./NotificationsList";
import Header from "./Header";
import Auth from "./auth/Auth";
import ResetPasswordConfirmForm from "./auth/ResetPasswordConfirmForm";
import DisplayMessage from "./auth/DisplayMessage";
import history from "../history";

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

export default App;
