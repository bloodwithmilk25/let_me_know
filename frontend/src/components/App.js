import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import NotificationsList from "./NotificationsList";
import Header from "./Header";
import AuthForm from "./AuthForm";

const App = () => {
  return (
    <div className="ui container">
      <BrowserRouter>
        <div>
          <Route path="/" exact component={AuthForm} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
