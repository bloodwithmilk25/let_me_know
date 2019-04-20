import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Auth from "./auth/Auth";
import injectSheet from "react-jss";
import styles from "./styles/HeaderStyles";

class Header extends React.Component {
  state = { menuIsExpanded: false };

  onToggleMenu = () => {
    this.setState({ menuIsExpanded: !this.state.menuIsExpanded });
  };

  render() {
    return (
      <nav className="navbar">
        <span onClick={this.onToggleMenu} className="navbar-toggle">
          <i className="fas fa-bars" />
        </span>
        <Link to="/" className="logo">
          letmeknow
        </Link>
        <ul className={`main-nav${this.state.menuIsExpanded ? " active" : ""}`}>
          <Auth />
        </ul>
      </nav>
    );
  }
}

const StyledHeader = injectSheet(styles)(Header);

export default connect(({ user }) => ({ user }))(StyledHeader);
