import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import injectSheet from "react-jss";
import Button from "@material-ui/core/Button";
import styles from "./styles/HeaderStyles";

class Header extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <header>
        <Link className={classes.logo} to="/">
          Let me know
        </Link>
        <Link to="/">User</Link>
      </header>
    );
  }
}

const StyledHeader = injectSheet(styles)(Header);

export default connect(({ user }) => ({ user }))(StyledHeader);
