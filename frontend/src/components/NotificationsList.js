import React from "react";
import { connect } from "react-redux";
import { fetchNotifications } from "../actions/notifications";
import NotificationCreate from "./NotificationCreate";
import NotificationCard from "./NotificationCard";
import Loader from "react-loader-spinner";

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
            key={n.id}
            form={`updateNotification_${n.id}`}
            initialValues={n}
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
    if (this.props.user.isSignedIn && !this.props.notifications.isFetched) {
      return (
        <div class="ui three column grid">
          <div class="column" />
          <div class="column">
            <Loader type="Puff" color="#f50057" height={250} width={250} />
          </div>
          <div class="column" />
        </div>
      );
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
