import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { confrimResetPassword } from "../../actions/auth";

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

  onSubmit = formValues => {
    const { uid, token } = this.props.match.params;
    console.log({ ...formValues, uid, token });
    this.props.confrimResetPassword({ ...formValues, uid, token });
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
          label="Password*"
        />
        <Field
          name="new_password2"
          component={this.renderInput}
          label="Repeat Password*"
        />
        <button className="ui button primary">Confirm</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (formValues.new_password1 !== formValues.new_password2) {
    const message = "Your passwords does not match";
    errors.new_password1 = message;
    errors.new_password2 = message;
  }

  return errors;
};

// adding redux form
const formWrapperd = reduxForm({
  form: "resetPasswordConfirm",
  validate
})(RegistrationForm);

// and then adding connect
export default connect(
  null,
  { confrimResetPassword }
)(formWrapperd);
