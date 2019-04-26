import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import Button from "@material-ui/core/Button";

import styles from "./styles/NotificationCardStyles";
import Modal from "../Modal";
import ConfirmDelete from "./ConfirmDelete";
import { renderDateTimePicker } from "../DateTimePicker";
import {
  updateNotification,
  putOnEdit,
  closeEdit
} from "../../actions/notifications";

class NotificationCard extends React.Component {
  state = { isUnderEdit: false, showDeleteModal: false };

  componentDidMount() {
    // set initial form values
    this.props.initialize(this.props.initialValues);
  }

  componentDidUpdate() {
    // if this notification is under edit and it's ID doesn't match
    // with notfUnderEdit from redux state, it means that some other notification
    // is being edited and we should close edit of this one
    if (
      this.state.isUnderEdit &&
      this.props.notfUnderEdit !== this.props.notfId
    ) {
      this.setState({ isUnderEdit: false });
    }
  }

  onToggleDeleteModal() {
    this.setState({ showDeleteModal: !this.state.showDeleteModal });
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

  onClickEditOpen = (formValues, e) => {
    // click to edit
    if (!this.state.isUnderEdit) {
      e.preventDefault();
      this.props.putOnEdit(this.props.notfId);
      this.setState({ isUnderEdit: true });
    } // click to finish edit
    else if (this.state.isUnderEdit) {
      this.props.updateNotification(this.props.notfId, formValues);
      this.props.closeEdit();
      this.setState({ isUnderEdit: false });
    }
  };

  editOrDoneButton = () => {
    if (!this.state.isUnderEdit) {
      return (
        <Button
          onClick={e => this.onClickEditOpen(null, e)}
          variant="contained"
          color="primary"
          style={{ marginTop: "10px" }}
        >
          Edit
        </Button>
      );
    }
    return (
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ marginTop: "10px" }}
      >
        Done
      </Button>
    );
  };

  deleteButton = () => {
    return (
      <Button
        onClick={() => this.onToggleDeleteModal()}
        variant="contained"
        color="secondary"
        style={{ margin: "10px 0 0 10px" }}
      >
        Delete
      </Button>
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={`${classes.card}${this.props.sent ? " sent" : ""}`}>
        <form
          onSubmit={this.props.handleSubmit(this.onClickEditOpen)}
          className="ui form error"
        >
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
          <div className={classes.buttonContainer}>
            {this.editOrDoneButton()}
            {this.deleteButton()}
          </div>
        </form>
        {this.state.showDeleteModal && (
          <Modal onCloseRequest={() => this.onToggleDeleteModal()}>
            <ConfirmDelete
              notfId={this.props.notfId}
              close={() => this.onToggleDeleteModal()}
            />
          </Modal>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { notfUnderEdit: state.notifications.notfUnderEdit };
};

const validate = formValues => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "Notification must have a title";
  }
  if (formValues.title && formValues.title.length > 50) {
    errors.title = "Title must fit in 50 characters";
  }
  return errors;
};

const styled = injectSheet(styles)(NotificationCard);

// adding redux form
const formWrapperd = reduxForm({
  validate
})(styled);

// and then adding connect
export default connect(
  mapStateToProps,
  { updateNotification, putOnEdit, closeEdit }
)(formWrapperd);
