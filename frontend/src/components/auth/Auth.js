import React from "react";
import { connect } from "react-redux";
import { signOut, fetchUser } from "../../actions/auth";

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
          <button
            onClick={() => this.onToggleLoginModal()}
            type="button"
            className="ui button primary"
          >
            Login
          </button>
          <button
            onClick={() => this.onToggleRegisterModal()}
            type="button"
            className="ui button primary"
          >
            Sign Up
          </button>

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
        <div>
          <h1>{this.props.user.email}</h1>
          <button onClick={this.onSignOut} className="ui button primary">
            Sign Out
          </button>
          <br />
          <br />
        </div>
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
