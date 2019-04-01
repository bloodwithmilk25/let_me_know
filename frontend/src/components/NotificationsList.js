import React from "react";
import { connect } from "react-redux";
import { fetchNotifications } from "../actions/notifications";

class NotificationsList extends React.Component {
  componentDidMount() {
    console.log(this.props.notf);
  }

  renderNotifications = () => {
    if (this.props.notf.length === 0) {
      return <h3>You have no notifications yet</h3>;
    }
    return this.props.notf.map(n => {
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
    console.log("called");
    if (this.props.user) {
      this.props.fetchNotifications();
      return this.renderNotifications();
    } else {
      return "wait";
    }
  }
}

const mapStateToProps = state => {
  return { user: state.user, notf: state.notifications };
};

export default connect(
  mapStateToProps,
  { fetchNotifications }
)(NotificationsList);
