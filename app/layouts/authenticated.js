import React, { Component } from "react";
import { Link, RouteHandler } from "react-router";

import { Jumbotron, Nav, Row, Col } from "react-bootstrap";

import { NavItemLink } from "react-router-bootstrap";

import AuthStore from "../stores/auth";
import SignIn from "../pages/signin";

export default class MainLayout extends Component {
  static displayName = "MainLayout";
  constructor() {
    super();
  }

  static willTransitionTo(transition) {
    if (!AuthStore.isLoggedIn()) {
      SignIn.attemptedTransition = transition;
      transition.redirect("sign-in");
    }
  }

  render() {
    return (
      <div>
      <div className="container">
        <Row>
          <Col md={2}>
            <h3>Links</h3>
            <Nav bsStyle="pills" stacked>
              <NavItemLink to="index">Index</NavItemLink>
              <NavItemLink to="null-page">Null</NavItemLink>
            </Nav>
          </Col>
          <Col md={10} className="well">
            <RouteHandler />
          </Col>
        </Row>
      </div>
      </div>
    );
  }
}
