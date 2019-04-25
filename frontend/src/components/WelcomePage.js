import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

import { toggleLoginModal, toggleRegisterModal } from "../actions/auth";

const styles = {
  "@global": {
    ".navbar": {
      margin: 0
    },
    body: {
      overflowY: "hidden"
    }
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
    background: "url(bcg.jpg)",
    backgroundRepeat: "no-repeat",
    opacity: 0,
    animationName: "appear",
    animationDelay: "1s",
    animationDuration: "1.5s",
    animationFillMode: "forwards"
  },
  "@keyframes appear": {
    from: { opacity: 0 },
    to: { opacity: 1 }
  },
  message: {
    backgroundColor: "rgba(255,255,255,0.5)",
    padding: 30,
    borderRadius: 15
  }
};

const renderWelcomePage = ({
  classes,
  dispatch,
  toggleLoginModal,
  toggleRegisterModal
}) => {
  return (
    <div className={classes.container}>
      <div className={classes.message}>
        <h1>
          Letmeknow is service that help you with your email notifications!
        </h1>
        <h2>
          Just
          <Link onClick={toggleLoginModal}> Login </Link>
          or <Link onClick={toggleRegisterModal}>Sign Up</Link> to create your
          first email notification
        </h2>
      </div>
    </div>
  );
};

const styled = injectSheet(styles)(renderWelcomePage);

export default connect(
  null,
  { toggleLoginModal, toggleRegisterModal }
)(styled);
