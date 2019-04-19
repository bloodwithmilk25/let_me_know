import React, { Component } from "react";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import isNil from "lodash/fp/isNil";
import styles from "./styles/ModalStyles";
import { clearErrors } from "../actions/auth";

// Declaration of the component as React Class Component
class Modal extends Component {
  // Init of the component before it is mounted.
  constructor(props) {
    super(props);

    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  // Add listeners immediately after the component is mounted.
  componentDidMount() {
    window.addEventListener("keyup", this.handleKeyUp, false);
    document.addEventListener("click", this.handleOutsideClick, false);
  }

  // Remove listeners immediately before a component is unmounted and destroyed.
  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleKeyUp, false);
    document.removeEventListener("click", this.handleOutsideClick, false);
    this.props.clearErrors();
  }

  // Handle the key press event.
  handleKeyUp(e) {
    const { onCloseRequest } = this.props;
    const keys = {
      27: () => {
        e.preventDefault();
        onCloseRequest();
        window.removeEventListener("keyup", this.handleKeyUp, false);
      }
    };

    if (keys[e.keyCode]) {
      keys[e.keyCode]();
    }
  }

  // Handle the mouse click on browser window.
  handleOutsideClick(e) {
    const { onCloseRequest } = this.props;

    if (!isNil(this.modal)) {
      if (!this.modal.contains(e.target)) {
        onCloseRequest();
        document.removeEventListener("click", this.handleOutsideClick, false);
      }
    }
  }

  // Render the component passing onCloseRequest and children as props.
  render() {
    const { children, classes } = this.props;

    return (
      <div className={classes.modalOverlay}>
        <div className={classes.modal} ref={node => (this.modal = node)}>
          <div className={classes.modalContent}>{children}</div>
        </div>
      </div>
    );
  }
}

// Export the component to use it in other components.
const styledModal = injectSheet(styles)(Modal);

export default connect(
  null,
  { clearErrors }
)(styledModal);
