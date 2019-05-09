import React from "react";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import Button from "@material-ui/core/Button";

import styles from "./styles/FormStyles";
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

  renderInput = ({ input, label, meta, type }) => {
    const className = `field${meta.error && meta.touched ? " error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = async formValues => {
    await this.props.createNotification({
      ...formValues,
      user: this.props.user.id
    });
    const errors = this.props.notifications.errors;
    if (errors) {
      throw new SubmissionError({
        ...errors,
        notify_on: errors.notify_on ? "Do you have a time machine?" : null
      });
    }
    if (this.props.valid) {
      // clear the form after the submit
      this.props.reset();
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.createForm}>
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className="ui form error"
        >
          <Field name="title" component={this.renderInput} label="Title" />
          <Field name="content" component={this.renderInput} label="Content" />
          <Field
            name="notify_on"
            component={renderDateTimePicker}
            label="Notify me on"
          />
          <Button
            className={classes.addButton}
            variant="contained"
            color="primary"
            type="submit"
          >
            New Notification
          </Button>
        </form>
      </div>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "Notification must have a title";
  }
  if (formValues.title && formValues.title.lenght > 50) {
    errors.title = "Title must fit in 50 characters";
  }
  if (!formValues.notify_on) {
    errors.notify_on = "Notification must have a date and time";
  }

  return errors;
};

const mapStateToProps = ({ user, notifications }) => {
  return { user, notifications };
};

const styled = injectSheet(styles)(NotificationForm);

// adding redux form
const formWrapperd = reduxForm({
  form: "createNotification",
  validate
})(styled);

// and then adding connect
export default connect(
  mapStateToProps,
  { createNotification }
)(formWrapperd);
