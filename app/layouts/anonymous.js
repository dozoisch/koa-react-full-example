import React, { Component } from "react";
import { Link, RouteHandler } from "react-router";

import { Jumbotron, Nav, Row, Col } from "react-bootstrap";

import { NavItemLink } from "react-router-bootstrap";

import AuthStore from "../stores/auth";

export default class AnonymousLayout extends Component {
  static displayName = "AnonymousLayout";
  constructor() {
    super();
  }

  render() {
    return (
      <Jumbotron>
        <div className="container">
          <RouteHandler />
        </div>
      </Jumbotron>
    );
  }
}
