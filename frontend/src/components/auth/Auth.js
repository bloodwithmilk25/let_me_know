import React from "react";
import { connect } from "react-redux";
import { signOut, fetchUser } from "../../actions/auth";
import { Link } from "react-router-dom";

import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import Modal from "../Modal";

class Auth extends React.Component {
  state = { showLoginModal: false, showRegisterModal: false };

  toggleLoginModal() {
    this.setState({ showLoginModal: !this.state.showLoginModal });
  }

  toggleRegisterModal() {
    this.setState({ showRegisterModal: !this.state.showRegisterModal });
  }

  componentDidMount() {
    this.props.fetchUser();
  }

  onSignOut = () => {
    this.props.signOut();
    this.props.closeNavbar();
  };

  render() {
    if (!this.props.user.isSignedIn) {
      return (
        <>
          <li>
            <Link onClick={() => this.toggleLoginModal()} className="nav-links">
              Login
            </Link>
          </li>
          <li>
            <Link
              onClick={() => this.toggleRegisterModal()}
              className="nav-links"
            >
              Sign Up
            </Link>
          </li>

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
  { signOut, fetchUser }
)(Auth);
