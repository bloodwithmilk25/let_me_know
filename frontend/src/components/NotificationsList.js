import React from "react";
import { connect } from "react-redux";
import { fetchNotifications } from "../actions/notifications";

class NotificationsList extends React.Component {
  componentDidUpdate() {
    if (!this.props.notifications.isFetched && this.props.user.isSignedIn) {
      this.props.fetchNotifications();
    }
  }

  renderNotifications = () => {
    if (this.props.notifications.list.length === 0) {
      return <h3>You have no notifications yet</h3>;
    }
    return this.props.notifications.list.map(n => {
      return (
        <div>
          <h3>{n.title}</h3>
          <p>{n.content}</p>
          <p>{n.notify_on}</p>
        </div>
      );
    });
  };

  render() {
    if (!this.props.user.isSignedIn) {
      return <h1>Login or sign up to start getting notifications</h1>;
    }
    return this.renderNotifications();
  }
}

const mapStateToProps = ({ user, notifications }) => {
  return { user, notifications };
};

export default connect(
  mapStateToProps,
  { fetchNotifications }
)(NotificationsList);
