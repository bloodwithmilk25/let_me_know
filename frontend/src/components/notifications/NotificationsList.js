import React from "react";
import { connect } from "react-redux";
import injectSheet from "react-jss";

import styles from "./styles/NotificationsListStyles";
import { fetchNotifications } from "../../actions/notifications";
import NotificationCreate from "./NotificationCreate";
import NotificationCard from "./NotificationCard";
import Loader from "react-loader-spinner";
import WelcomePage from "../WelcomePage";

class NotificationsList extends React.Component {
  componentDidMount() {
    if (this.props.user.isSignedIn) {
      this.props.fetchNotifications();
    }
  }

  componentDidUpdate() {
    if (!this.props.notifications.isFetched && this.props.user.isSignedIn) {
      this.props.fetchNotifications();
    }
  }

  renderNotifications = () => {
    if (this.props.notifications.list.length === 0) {
      return (
          <div className={this.props.classes.noNotifc}>
            <h1>You have no notifications yet =(</h1>
            <h2>There must be something!</h2>
          </div>
      )
    }
    return this.props.notifications.list.map(n => {
      return (
        <NotificationCard
          key={n.id}
          form={`updateNotification_${n.id}`}
          initialValues={n}
          sent={n.sent}
          notfId={n.id}
        />
      );
    });
  };

  render() {
    const { classes } = this.props;

    if (!this.props.user.isSignedIn) {
      return <WelcomePage />;
    }
    if (this.props.user.isSignedIn && !this.props.notifications.isFetched) {
      return (
        <div className={classes.loaderCont}>
          <Loader type="Audio" color="#f50057" height={250} width={250} />
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
