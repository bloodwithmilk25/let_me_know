import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import injectSheet from "react-jss";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  navbar: { marginBottom: 25 }
};

class Header extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <AppBar className={classes.navbar} position="sticky">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              <Link to="/">Notify.me</Link>
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const StyledHeader = injectSheet(styles)(Header);

export default connect(({ user }) => ({ user }))(StyledHeader);
