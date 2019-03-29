import React from "react";
import { connect } from "react-redux";
import { fetchNotifications } from "../actions/notifications";

class NotificationsList extends React.Component {
  componentDidMount() {
    console.log("!!!");
    if (this.props.user) {
      console.log("has user");
      this.props.fetchNotifications();
    }
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
