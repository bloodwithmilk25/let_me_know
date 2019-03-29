import React from "react";
import { connect } from "react-redux";
import { fetchNotifications } from "../actions/notifications";

class NotificationsList extends React.Component {
  componentDidMount() {
    this.props.fetchNotifications();
  }

  render() {
    return <div>List</div>;
  }
}

export default connect(
  null,
  { fetchNotifications }
)(NotificationsList);
