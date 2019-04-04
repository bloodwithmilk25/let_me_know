import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import { updateNotification } from "../actions/notifications";
import { renderDateTimePicker } from "./DateTimePicker";

class AuthForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta, value }) => {
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
    this.props.updateNotification(formValues);
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field
          name={`title${this.props.notfId}`}
          component={this.renderInput}
          label="Title"
        />
        <Field
          name={`content${this.props.notfId}`}
          component={this.renderInput}
          label="Content"
        />
        <Field
          name={`notify_on${this.props.notfId}`}
          component={renderDateTimePicker}
          label="Notify Me On"
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
  // if (!formValues.notify_on) {
  //   errors.notify_on = "Enter time and date you want to receive notification at";
  // }

  return errors;
};

const mapStateToProps = (state, ownProps) => {
  const notfId = ownProps.notfId;
  const title = "title" + notfId;
  const content = "content" + notfId;
  const notify_on = "notify_on" + notfId;

  const xui = {};
  xui[title] = ownProps.title;
  xui[content] = ownProps.content;
  xui[notify_on] = ownProps.notify_on;
  console.log(xui);
  return {
    initialValues: { ...state.initialValues, ...xui }
  };
};

// adding redux form
const formWrapperd = reduxForm({
  form: "updateNotification",
  validate
})(AuthForm);

// and then adding connect
export default connect(
  mapStateToProps,
  { updateNotification }
)(formWrapperd);
