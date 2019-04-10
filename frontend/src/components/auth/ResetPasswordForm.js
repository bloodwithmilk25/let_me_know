import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { resetPassword } from "../../actions/auth";

class ResetPasswordForm extends React.Component {
  renderInput = ({ input, label }) => {
    return (
      <div className="field">
        <label>{label}</label>
        <input {...input} type="email" autoComplete="off" />
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.resetPassword(formValues);
    //TODO redirect to "email was sent to you"
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form"
      >
        <Field name="email" component={this.renderInput} label="Your email" />
        <button className="ui button primary">Confirm</button>
      </form>
    );
  }
}

// adding redux form
const formWrapperd = reduxForm({
  form: "resetPassword"
})(ResetPasswordForm);

// and then adding connect
export default connect(
  null,
  { resetPassword }
)(formWrapperd);
