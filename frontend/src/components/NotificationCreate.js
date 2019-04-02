import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import { createNotification } from "../actions/notifications";
import { renderDateTimePicker } from "./DateTimePicker";

class NotificationForm extends React.Component {
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
    console.log({
      ...formValues,
      user: this.props.user.id,
      notify_on: formValues.notify_on
    });
    this.props.createNotification({
      ...formValues,
      user: this.props.user.id,
      notify_on: formValues.notify_on
    });
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="title" component={this.renderInput} label="Title" />
        <Field name="content" component={this.renderInput} label="Content" />
        <Field
          name="notify_on"
          component={renderDateTimePicker}
          label="Notify Me On"
        />
        <button className="ui button primary">New Notification</button>
        <br />
        <br />
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "Notification must have a title";
  }
  // if (!formValues.notify_on) {
  //   errors.notify_on = "Enter time and date you want to receive notification at";
  // }

  return errors;
};

const mapStateToProps = ({ user }) => {
  return { user };
};

// adding redux form
const formWrapperd = reduxForm({
  form: "createNotification",
  validate
})(NotificationForm);

// and then adding connect
export default connect(
  mapStateToProps,
  { createNotification }
)(formWrapperd);