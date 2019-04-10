import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import { sign_in } from "../../actions/auth";
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

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.sign_in(formValues);
  };

  render() {
    return (
      <>
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className="ui form error"
        >
          <Field name="email" component={this.renderInput} label="Email" />
          <Field
            name="password"
            component={this.renderInput}
            label="Password"
          />
          <button className="ui button primary">Login</button>
        </form>
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

// adding redux form
const formWrapperd = reduxForm({
  form: "login",
  validate
})(LoginForm);

// and then adding connect
export default connect(
  null,
  { sign_in }
)(formWrapperd);
