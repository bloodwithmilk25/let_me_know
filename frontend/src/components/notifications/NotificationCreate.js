import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";

import { createNotification } from "../../actions/notifications";
import { renderDateTimePicker } from "../DateTimePicker";

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
    this.props.createNotification({
      ...formValues,
      user: this.props.user.id
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
        <Button variant="contained" color="primary" type="submit">
          New Notification
        </Button>
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
