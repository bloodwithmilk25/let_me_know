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
    console.log("called");
    this.props.changePassword(formValues);
    const errors = await this.props.erross;
    if (errors) {
      console.log("passed IF");
      throw new SubmissionError({ ...errors });
    }
  };

  hasErrors = () => {
    return !this.props.valid || this.props.password_errors.length > 0;
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
          />
        </form>
        {this.props.password_errors.length > 0 &&
          this.props.password_errors.map(e => {
            return (
              <div className="ui error message">
                <div className="header">{e}</div>
              </div>
            );
          })}
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
  const password_errors = [];
  if (user.errors) {
    for (var key in user.errors.password) {
      user.errors.password[key].map(e => password_errors.push(e));
    }
  }
  return { errors: user.errors.password, password_errors };
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
