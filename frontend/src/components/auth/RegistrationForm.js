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

  onSubmit = formValues => {
    this.props.register(formValues);
  };

  render() {
    return (
      <>
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className="ui form error"
        >
          <Field
            name="first_name"
            component={this.renderInput}
            label="How would like to be called?"
            type="text"
          />
          <Field
            name="email"
            component={this.renderInput}
            label="Email*"
            type="email"
          />
          <Field
            name="password1"
            component={this.renderInput}
            label="Password*"
            type="password"
          />
          <Field
            name="password2"
            component={this.renderInput}
            label="Repeat Password*"
            type="password"
          />
          <button className="ui button primary">Confirm</button>
        </form>
        <a href="/api/auth/accounts/google/login">
          <button className="ui button primary">Sign up with Google</button>
        </a>
        {this.props.errors.length > 0 &&
          this.props.errors.map(e => {
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
  if (!formValues.email) {
    errors.email = "You must enter an email";
  }
  if (!formValues.password1) {
    errors.password = "You must enter a password";
  }
  if (formValues.password1 !== formValues.password2) {
    errors.password2 = "Your passwords does not match";
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
  form: "registration",
  validate
})(RegistrationForm);

// and then adding connect
export default connect(
  mapStateToProps,
  { register }
)(formWrapperd);
