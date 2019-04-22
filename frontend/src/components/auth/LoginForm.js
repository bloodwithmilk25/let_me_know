import React from "react";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import injectSheet from "react-jss";

import styles from "./styles/FormStyles";
import ButtonLoader from "../ButtonLoader";
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

  // function is async so we could make use of server
  // side validation and return errors from server
  // which is only avaliable when onSubmit returns a promise
  onSubmit = async formValues => {
    await this.props.signIn(formValues);
    const errors = this.props.errors;
    if (errors) {
      throw new SubmissionError({
        ...errors,
        password: errors.non_field_errors
      });
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
          <div className={classes.buttonContainer}>
            <ButtonLoader
              className={classes.button}
              buttonText="Login"
              onSubmit={this.props.handleSubmit(this.onSubmit)}
              hasErrors={this.hasErrors}
              delay={1000}
            />
            <a
              href="/api/auth/accounts/google/login"
              className={classes.button}
            >
              <Button variant="contained" color="primary" type="button">
                Sign In With Google
              </Button>
            </a>
          </div>
        </form>
        <div className={classes.additionalButtons}>
          <p>
            Forgot Password?
            <Link
              style={{ marginLeft: 7 }}
              className={classes.link}
              onClick={() => this.onToggleResetModal()}
            >
              Reset It
            </Link>
          </p>
        </div>

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
  return {
    errors: user.errors
  };
};

const styled = injectSheet(styles)(LoginForm);

// adding redux form
const formWrapperd = reduxForm({
  form: "login",
  validate
})(styled);

// and then adding connect
export default connect(
  mapStateToProps,
  { signIn }
)(formWrapperd);
