import React from "react";
import { connect } from "react-redux";
import { fetchNotifications } from "../actions/notifications";

class NotificationsList extends React.Component {
  componentDidMount() {
    console.log(this.props.notf);
    this.props.fetchNotifications();
  }

  render() {
    return <div>Total of {this.props.notf.length} notf</div>;
  }
}

const mapStateToProps = state => {
  return { user: state.user, notf: state.notifications };
};

export default connect(
  mapStateToProps,
  { fetchNotifications }
)(NotificationsList);
