"use strict";
import React, { PropTypes } from "react";

import { Link } from "react-router";

import { Navbar, Nav, Glyphicon } from "react-bootstrap";

import { NavItemLink } from "react-router-bootstrap";

import AuthStore from "../../stores/auth";

const AppNavbar = React.createClass({
  displayName: "AppNavbar",

  propTypes: {
    brand: PropTypes.string,
  },

  getInitialState() {
    return {
      user: AuthStore.getUser(),
    };
  },

  componentWillMount() {
    AuthStore.init();
  },

  componentDidMount() {
    AuthStore.addChangeListener(this.updateUser);
  },

  componentWillUnmount() {
    AuthStore.removeChangeListener(this.updateUser);
  },

  updateUser() {
    if(!this.isMounted()) {
      return;
    }
    this.setState({
      user: AuthStore.getUser(),
    });
  },

  renderBrand() {
    return (<Link to="index">{this.props.brand}</Link>);
  },

  renderNavLinks() {
    if (this.state.user) {
      return (
        <Nav right eventKey={0}>
          <NavItemLink eventKey={1} to="profile">
            <Glyphicon glyph="user" /> {this.state.user.username}
          </NavItemLink>
          <NavItemLink to="sign-out">
            <Glyphicon glyph="off" /> Sign out
          </NavItemLink>
        </Nav>
      );
    }
    return (
      <Nav right eventKey={0}>
        <NavItemLink eventKey={1} to="sign-up">
           <Glyphicon glyph="user" /> Sign up
        </NavItemLink>
      </Nav>
    );
  },

  render() {
    return (
      <Navbar brand={this.renderBrand()} inverse fixedTop toggleNavKey={this.state.user ? 0 : undefined}>
        {this.renderNavLinks()}
      </Navbar>
    );
  }
});

export default AppNavbar;
