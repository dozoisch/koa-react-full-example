import React from "react";
import { Link, RouteHandler } from "react-router";

import { Jumbotron, Nav, Row, Col } from "react-bootstrap";

import { NavItemLink } from "react-router-bootstrap";

import AuthStore from "../../stores/auth";
import Authentication from "../mixins/authentication";

const MainLayout = React.createClass({
  displayName: "MainLayout",

  mixins: [Authentication],

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
});

export default MainLayout;
