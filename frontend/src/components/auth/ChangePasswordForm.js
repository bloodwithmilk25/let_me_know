import React from "react";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { connect } from "react-redux";

import { changePassword } from "../../actions/auth";
import ButtonLoader from "../ButtonLoader";

class ChangePasswordForm extends React.Component {
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
        <input {...input} autoComplete="off" type={type} />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = async formValues => {
    await this.props.changePassword(formValues);
    const errors = this.props.errors.password;
    if (errors) {
      throw new SubmissionError({ ...errors });
    }
  };

  hasErrors = () => {
    return !this.props.valid;
  };

  render() {
    return (
      <>
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className="ui form error"
        >
          <Field
            name="old_password"
            component={this.renderInput}
            label="Old Password"
            type="password"
          />
          <Field
            name="new_password1"
            component={this.renderInput}
            label="New Password"
            type="password"
          />
          <Field
            name="new_password2"
            component={this.renderInput}
            label="Repeat Password"
            type="password"
          />
          <ButtonLoader
            buttonText="Change Password"
            onSubmit={this.props.handleSubmit(this.onSubmit)}
            hasErrors={this.hasErrors}
            delay={1000}
          />
        </form>
      </>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.old_password) {
    errors.old_password = "You must enter an old password";
  }
  if (formValues.new_password1 !== formValues.new_password2) {
    errors.new_password2 = "Your passwords does not match";
  }

  return errors;
};

const mapStateToProps = ({ user }) => {
  return {
    errors: user.errors
  };
};

// adding redux form
const formWrapperd = reduxForm({
  form: "changePassword",
  validate
})(ChangePasswordForm);

// and then adding connect
export default connect(
  mapStateToProps,
  { changePassword }
)(formWrapperd);
