import React from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import { deleteNotification } from "../../actions/notifications";

class ConfirmDelete extends React.Component {
  onDelete = () => {
    this.props.deleteNotification(this.props.notfId);
  };

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          onClick={this.onDelete}
          variant="contained"
          color="secondary"
          style={{ marginRight: 7 }}
        >
          Yay
        </Button>
        <Button
          onClick={this.props.close}
          variant="contained"
          color="primary"
          style={{ marginLeft: 7 }}
        >
          Nay
        </Button>
      </div>
    );
  }
}

export default connect(
  null,
  { deleteNotification }
)(ConfirmDelete);
