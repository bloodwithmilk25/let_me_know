import React from "react";
import { connect } from "react-redux";
import { fetchNotifications } from "../actions/notifications";

class NotificationsList extends React.Component {
  componentDidMount() {
    this.props.fetchNotifications();
  }

  componentDidUdate() {
    this.props.fetchNotifications();
  }

  render() {
    return <div>List</div>;
  }
}

const mapStateToProps = state => {
  console.log(state);
  return { user: state.user };
};

export default connect(
  mapStateToProps,
  { fetchNotifications }
)(NotificationsList);
