import React from "react";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

import styles from "./styles/WelcomePageStyles";
import LoginForm from "./auth/LoginForm";
import RegistrationForm from "./auth/RegistrationForm";
import Modal from "./Modal";

class WelcomePage extends React.Component {
  state = { showLoginModal: false, showRegisterModal: false };

  toggleLoginModal() {
    this.setState({ showLoginModal: !this.state.showLoginModal });
  }

  toggleRegisterModal() {
    this.setState({ showRegisterModal: !this.state.showRegisterModal });
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <div className={classes.container}>
          <div className={classes.message}>
            <h1>
              <span style={{ fontWeight: 900 }}>Letmeknow</span> is a service
              that will send you email notifications!
            </h1>
            <h2>
              Just
              <Link onClick={() => this.toggleLoginModal()}> Login </Link>
              or <Link onClick={() => this.toggleRegisterModal()}>
                Sign Up
              </Link>{" "}
              to create your first notification!
            </h2>
          </div>
        </div>
        {this.state.showLoginModal && (
          <Modal onCloseRequest={() => this.toggleLoginModal()}>
            <LoginForm />
          </Modal>
        )}
        {this.state.showRegisterModal && (
          <Modal onCloseRequest={() => this.toggleRegisterModal()}>
            <RegistrationForm />
          </Modal>
        )}
      </>
    );
  }
}

export default injectSheet(styles)(WelcomePage);
