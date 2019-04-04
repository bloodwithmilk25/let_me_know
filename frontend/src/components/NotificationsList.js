import React from "react";
import { connect } from "react-redux";
import { fetchNotifications } from "../actions/notifications";
import NotificationCreate from "./NotificationCreate";
import NotificationCard from "./NotificationCard";

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
          <NotificationCard
            title={n.title}
            content={n.content}
            notify_on={n.notify_on}
            key={n.id}
            notfId={n.id}
          />
        </div>
      );
    });
  };

  render() {
    if (!this.props.user.isSignedIn) {
      return <h1>Login or sign up to start getting notifications</h1>;
    }
    return (
      <div>
        <NotificationCreate />
        {this.renderNotifications()}
      </div>
    );
  }
}

const mapStateToProps = ({ user, notifications }) => {
  return { user, notifications };
};

export default connect(
  mapStateToProps,
  { fetchNotifications }
)(NotificationsList);
