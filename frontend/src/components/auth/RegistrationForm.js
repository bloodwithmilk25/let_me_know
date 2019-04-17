import React from "react";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import injectSheet from "react-jss";

import styles from "./styles/RegistrationFormStyles";
import ButtonLoader from "../ButtonLoader";
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

  onSubmit = async formValues => {
    await this.props.register(formValues);
    const errors = this.props.errors;
    if (errors) {
      throw new SubmissionError({ ...errors });
    }
  };

  hasErrors = () => {
    return !this.props.valid;
  };

  render() {
    const { classes } = this.props;
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
          <div className={classes.signUpButtonContainer}>
            <ButtonLoader
              className={classes.signUpButton}
              buttonText="Sign Up"
              onSubmit={this.props.handleSubmit(this.onSubmit)}
              hasErrors={this.hasErrors}
              delay={1000}
            />
            <a
              href="/api/auth/accounts/google/login"
              className={classes.signUpButton}
            >
              <Button variant="contained" color="primary" type="button">
                Sign Up With Google
              </Button>
            </a>
          </div>
        </form>
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
  return {
    errors: user.errors
  };
};

const styled = injectSheet(styles)(RegistrationForm);

// adding redux form
const formWrapperd = reduxForm({
  form: "registration",
  validate
})(styled);

// and then adding connect
export default connect(
  mapStateToProps,
  { register }
)(formWrapperd);
