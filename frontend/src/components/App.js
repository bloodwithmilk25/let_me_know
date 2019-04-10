import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import NotificationsList from "./NotificationsList";
import Header from "./Header";
import Auth from "./auth/Auth";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <div className="ui container">
          <Route path="/" exact component={Auth} />
          <Route path="/" exact component={NotificationsList} />
          {/* <Route path="/email-confirmed" exact component= /> */}
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
