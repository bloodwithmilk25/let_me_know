import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import { updateNotification } from "../actions/notifications";
import { renderDateTimePicker } from "./DateTimePicker";

class NotificationCard extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta, disabled }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} disabled={disabled} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.updateNotification(formValues);
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field
          name="title"
          component={this.renderInput}
          label="Title"
          disabled={true}
        />
        <Field
          name="content"
          component={this.renderInput}
          label="Content"
          disabled={true}
        />
        <Field
          name="notify_on"
          component={renderDateTimePicker}
          label="Notify Me On"
          disabled={true}
        />
        <button className="ui button primary">Update Notification</button>
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
  return errors;
};

// adding redux form
const formWrapperd = reduxForm({
  validate
})(NotificationCard);

// and then adding connect
export default connect(
  null,
  { updateNotification }
)(formWrapperd);
