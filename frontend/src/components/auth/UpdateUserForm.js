import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import { renderDateTimePicker } from "../DateTimePicker";
import { updateUser, fetchUser } from "../../actions/auth";

class UpdateUserForm extends React.Component {
  componentDidMount() {
    if (!this.props.user.isSignedIn) {
      this.props.fetchUser();
    }
    this.props.initialize(this.props.user);
  }

  componentDidUpdate() {
    if (this.props.pristine) {
      this.props.initialize(this.props.user);
    }
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
        <input {...input} />
        {this.renderError(meta)}
      </div>
    );
  };

  onUpdateUser = formValues => {
    console.log(formValues.date_of_birth);
    this.props.updateUser(formValues);
  };

  render() {
    return (
      <>
        <form
          onSubmit={this.props.handleSubmit(this.onUpdateUser)}
          className="ui form error"
        >
          <Field
            name="first_name"
            component={this.renderInput}
            label="First Name"
          />
          <Field
            name="last_name"
            component={this.renderInput}
            label="Last Name"
          />
          <Field
            name="date_of_birth"
            component={renderDateTimePicker}
            label="Date of Birth"
            showTime={false}
            Format={"MMM D, Y"}
            editFormat={"MMM D, Y"}
          />
          <button className="ui button primary">Save Changes</button>
        </form>

        <p>Change Password:</p>
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
  return { user };
};

const formWrapperd = reduxForm({
  form: "updateUserForm"
})(UpdateUserForm);

export default connect(
  mapStateToProps,
  { updateUser, fetchUser }
)(formWrapperd);
