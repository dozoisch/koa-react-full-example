"use strict";
import React, { PropTypes } from "react";

import { Link } from "react-router";

import { Navbar, Nav, Glyphicon } from "react-bootstrap";

import { NavItemLink } from "react-router-bootstrap";

import AuthStore from "../stores/auth";

export default class AppNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = "AppNavbar";
    this.state = { user: props.user };
    this.updateUser = this.updateUser.bind(this);
  }

  componentWillMount() {
    AuthStore.init();
  }

  componentDidMount() {
    AuthStore.addChangeListener(this.updateUser);
  }

  componentWillUnmount() {
    AuthStore.removeChangeListener(this.updateUser);
  }

  updateUser() {
    this.setState({
      user: AuthStore.getUser()
    });
  }

  renderBrand() {
    return (<Link to="index">{this.props.brand}</Link>);
  }

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
  }

  render() {
    return (
      <Navbar brand={this.renderBrand()} inverse fixedTop toggleNavKey={this.state.user ? 0 : undefined}>
        {this.renderNavLinks()}
      </Navbar>
    );
  }
}

AppNavbar.propTypes = { brand: React.PropTypes.string };
AppNavbar.defaultProps = { user: AuthStore.getUser()};
