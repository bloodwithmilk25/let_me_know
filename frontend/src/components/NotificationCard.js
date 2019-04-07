import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import {
  updateNotification,
  putOnEdit,
  closeEdit
} from "../actions/notifications";
import { renderDateTimePicker } from "./DateTimePicker";

class NotificationCard extends React.Component {
  state = { isUnderEdit: false };

  componentDidUpdate() {
    // TODO
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

  onClickEditOpen = e => {
    // TODO
  };

  editOrDoneButton = () => {
    if (!this.state.isUnderEdit) {
      return (
        <div>
          <button
            onClick={e => this.onClickEditOpen(e)}
            className="ui button red"
          >
            Edit
          </button>
        </div>
      );
    }
    return (
      <div>
        <button
          onClick={e => this.onClickEditOpen(e)}
          className="ui button green"
        >
          Done
        </button>
      </div>
    );
  };

  render() {
    return (
      <form className="ui form error">
        <Field
          name="title"
          component={this.renderInput}
          label="Title"
          disabled={!this.state.isUnderEdit}
        />
        <Field
          name="content"
          component={this.renderInput}
          label="Content"
          disabled={!this.state.isUnderEdit}
        />
        <Field
          name="notify_on"
          component={renderDateTimePicker}
          label="Notify Me On"
          disabled={!this.state.isUnderEdit}
        />
        {this.editOrDoneButton()}
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
  state => ({ notfUnderEdit: state.notifications.notfUnderEdit }),
  { updateNotification, putOnEdit, closeEdit }
)(formWrapperd);
