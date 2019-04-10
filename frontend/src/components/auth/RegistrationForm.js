import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { register } from "../../actions/auth";

class RegistrationForm extends React.Component {
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
    this.props.register(formValues);
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field
          name="first_name"
          component={this.renderInput}
          label="Your first name or nickname"
        />
        <Field name="email" component={this.renderInput} label="Email" />
        <Field name="password1" component={this.renderInput} label="Password" />
        <Field
          name="password2"
          component={this.renderInput}
          label="Repeat Password"
        />
        <button className="ui button primary">Confirm</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.email) {
    errors.email = "You must enter an email";
  }
  if (!formValues.password1) {
    errors.password = "You must enter a password";
  }
  if (formValues.password1 !== formValues.password2) {
    const message = "Your passwords does not match";
    errors.password1 = message;
    errors.password2 = message;
  }

  return errors;
};

// adding redux form
const formWrapperd = reduxForm({
  form: "registration",
  validate
})(RegistrationForm);

// and then adding connect
export default connect(
  null,
  { register }
)(formWrapperd);
