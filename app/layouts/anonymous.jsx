import React from "react";
import { Link, RouteHandler } from "react-router";

import { Jumbotron, Nav, Row, Col } from "react-bootstrap";

import { NavItemLink } from "react-router-bootstrap";

import AuthStore from "../stores/auth";

const AnonymousLayout = React.createClass({
  displayName: "AnonymousLayout",
  render() {
    return (
      <Jumbotron>
        <div className="container">
          <RouteHandler />
        </div>
      </Jumbotron>
    );
  }
});

export default AnonymousLayout;
