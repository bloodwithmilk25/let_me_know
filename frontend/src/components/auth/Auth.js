import React from "react";
import { connect } from "react-redux";
import { signOut, fetchUser } from "../../actions/auth";
import { Link } from "react-router-dom";

import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import Modal from "../Modal";

class Auth extends React.Component {
  state = { showLoginModal: false, showRegisterModal: false };

  componentDidMount() {
    this.props.fetchUser();
  }

  onToggleLoginModal() {
    this.setState({ showLoginModal: !this.state.showLoginModal });
  }

  onToggleRegisterModal() {
    this.setState({ showRegisterModal: !this.state.showRegisterModal });
  }

  onSignOut = () => {
    this.props.signOut();
    this.setState({ showLoginModal: false, showRegisterModal: false });
  };

  render() {
    if (!this.props.user.isSignedIn) {
      return (
        <>
          <li>
            <Link
              onClick={() => this.onToggleLoginModal()}
              className="nav-links"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              onClick={() => this.onToggleRegisterModal()}
              className="nav-links"
            >
              Sign Up
            </Link>
          </li>

          {this.state.showLoginModal && (
            <Modal onCloseRequest={() => this.onToggleLoginModal()}>
              <LoginForm />
            </Modal>
          )}
          {this.state.showRegisterModal && (
            <Modal onCloseRequest={() => this.onToggleRegisterModal()}>
              <RegistrationForm />
            </Modal>
          )}
        </>
      );
    } else {
      return (
        <>
          <li>
            <span className="nav-username">{this.props.user.email}</span>
          </li>
          <li>
            <Link to="/update-user" className="nav-links">
              Edit profile
            </Link>
          </li>
          <li>
            <Link onClick={this.onSignOut} className="nav-links">
              Sign Out
            </Link>
          </li>
        </>
      );
    }
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(
  mapStateToProps,
  { signOut, fetchUser }
)(Auth);
