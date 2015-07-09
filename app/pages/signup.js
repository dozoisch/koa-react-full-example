import React, { Component, PropTypes } from "react";

import { Col, Input, Button } from "react-bootstrap";

import AuthStore from "../stores/auth";

export default class SignUp extends Component {
  static displayName = "SignUp";
  static contextTypes = { router: PropTypes.func };

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const username = this.refs.username.getValue();
    const password = this.refs.password.getValue();
    const repeatPassword = this.refs.repeatPassword.getValue();

    if (password === repeatPassword && password.trim()) {
      AuthStore.signUp(username, password, (err, user) => {
        if (err || !user) {
          return this.setState({ error: "Could not Create the User" });
        }
        this.context.router.replaceWith("index");
      });
    }
  }

  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <Col md={4} mdOffset={4}>
          <form onSubmit={this.handleSubmit} className={this.state.error ? "has-error" : null}>
            <Input type="text" ref="username" placeholder="username" label="Username" />
            <Input type="password" ref="password" placeholder="password" label="Password" />
            <Input type="password" ref="repeatPassword" placeholder="password" label="Repeat Password" />
            <Button type="submit" bsStyle="success" className="pull-right">Sign Up</Button>
            {this.renderErrorBlock()}
          </form>
        </Col>
      </div>
    );
  }

  renderErrorBlock() {
    return (<p className="help-block">{this.state.error}</p>);
  }
}
