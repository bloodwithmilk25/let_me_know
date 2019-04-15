import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import { signIn } from "../../actions/auth";
import Modal from "../Modal";
import ResetPasswordForm from "./ResetPasswordForm";

class LoginForm extends React.Component {
  state = { showResetModal: false };

  onToggleResetModal() {
    this.setState({ showResetModal: !this.state.showResetModal });
  }

  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta, type }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} type={type} />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.signIn(formValues);
  };

  render() {
    return (
      <>
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className="ui form error"
        >
          <Field
            name="email"
            component={this.renderInput}
            label="Email"
            type="email"
          />
          <Field
            name="password"
            component={this.renderInput}
            label="Password"
            type="password"
          />
          <button className="ui button primary">Login</button>
        </form>
        {this.props.errors.length > 0 &&
          this.props.errors.map(e => {
            return (
              <div className="ui error message">
                <div className="header">{e}</div>
              </div>
            );
          })}
        <a href="/api/auth/accounts/google/login">
          <button className="ui button primary">Login with Google</button>
        </a>
        <p>Forgot Password?</p>
        <button
          onClick={() => this.onToggleResetModal()}
          type="button"
          className="ui button primary"
        >
          Reset Password
        </button>

        {this.state.showResetModal && (
          <Modal onCloseRequest={() => this.onToggleResetModal()}>
            <ResetPasswordForm />
          </Modal>
        )}
      </>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.email) {
    errors.email = "You must enter an email";
  }
  if (!formValues.password) {
    errors.password = "You must enter a password";
  }

  return errors;
};

const mapStateToProps = ({ user }) => {
  const errors = [];
  for (var key in user.errors) {
    user.errors[key].map(e => errors.push(e));
  }
  return { errors };
};

// adding redux form
const formWrapperd = reduxForm({
  form: "login",
  validate
})(LoginForm);

// and then adding connect
export default connect(
  mapStateToProps,
  { signIn }
)(formWrapperd);
