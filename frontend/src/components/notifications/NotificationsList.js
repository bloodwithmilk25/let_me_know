import React from "react";
import { connect } from "react-redux";
import injectSheet from "react-jss";

import styles from "./styles/NotificationsListStyles";
import { fetchNotifications } from "../../actions/notifications";
import NotificationCreate from "./NotificationCreate";
import NotificationCard from "./NotificationCard";
import Loader from "react-loader-spinner";

class NotificationsList extends React.Component {
  componentDidMount() {
    this.props.fetchNotifications();
  }

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
        <NotificationCard
          key={n.id}
          form={`updateNotification_${n.id}`}
          initialValues={n}
          notfId={n.id}
        />
      );
    });
  };

  render() {
    const { classes } = this.props;

    if (!this.props.user.isSignedIn) {
      return <h1>Login or sign up to start getting notifications</h1>;
    }
    if (this.props.user.isSignedIn && !this.props.notifications.isFetched) {
      return (
        <div className="ui three column grid">
          <div className="column" />
          <div className="column">
            <Loader type="Puff" color="#f50057" height={250} width={250} />
          </div>
          <div className="column" />
        </div>
      );
    }
    return (
      <>
        <NotificationCreate />
        <div className={classes.list}>{this.renderNotifications()}</div>
      </>
    );
  }
}

const mapStateToProps = ({ user, notifications }) => {
  return { user, notifications };
};

const styled = injectSheet(styles)(NotificationsList);

export default connect(
  mapStateToProps,
  { fetchNotifications }
)(styled);
