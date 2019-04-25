import React from "react";
import { connect } from "react-redux";
import {
  signOut,
  fetchUser,
  toggleLoginModal,
  toggleRegisterModal
} from "../../actions/auth";
import { Link } from "react-router-dom";

import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import Modal from "../Modal";

class Auth extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  onSignOut = () => {
    this.props.signOut();
    this.setState({ showLoginModal: false, showRegisterModal: false });
    this.props.closeNavbar();
  };

  render() {
    if (!this.props.user.isSignedIn) {
      return (
        <>
          <li>
            <Link
              onClick={() => this.props.toggleLoginModal()}
              className="nav-links"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              onClick={() => this.props.toggleRegisterModal()}
              className="nav-links"
            >
              Sign Up
            </Link>
          </li>

          {this.props.user.showLoginModal && (
            <Modal onCloseRequest={() => this.props.toggleLoginModal()}>
              <LoginForm />
            </Modal>
          )}
          {this.props.user.showRegisterModal && (
            <Modal onCloseRequest={() => this.props.toggleRegisterModal()}>
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
            <Link
              onClick={this.props.closeNavbar}
              to="/update-user"
              className="nav-links"
            >
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
  { signOut, fetchUser, toggleLoginModal, toggleRegisterModal }
)(Auth);
