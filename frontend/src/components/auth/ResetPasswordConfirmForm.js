import React from "react";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { connect } from "react-redux";

import { confrimResetPassword } from "../../actions/auth";
import ButtonLoader from "../ButtonLoader";

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
        <input {...input} type="password" autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = async formValues => {
    const { uid, token } = this.props.match.params;
    await this.props.confrimResetPassword({ ...formValues, uid, token });
    const errors = this.props.errors;
    console.log(errors);
    if (errors) {
      console.log("!");
      throw new SubmissionError({ ...errors });
    }
  };

  hasErrors = () => {
    return !this.props.valid;
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field
          name="new_password1"
          component={this.renderInput}
          label="Password"
        />
        <Field
          name="new_password2"
          component={this.renderInput}
          label="Repeat Password"
        />
        <ButtonLoader
          buttonText="Set New Password"
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          hasErrors={this.hasErrors}
          delay={1000}
        />
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};
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
  form: "resetPasswordConfirm",
  validate
})(RegistrationForm);

// and then adding connect
export default connect(
  mapStateToProps,
  { confrimResetPassword }
)(formWrapperd);
