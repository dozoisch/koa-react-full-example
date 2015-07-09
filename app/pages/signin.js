import React, { Component, PropTypes } from "react";
import { Link } from "react-router";

import { Col, Input, Button, Row } from "react-bootstrap";

import AuthStore from "../stores/auth";

export default class SignIn extends Component {
  static displayName = "SignInPage";

  static contextTypes = { router: PropTypes.func.isRequired };
  static attemptedTransition = null;
  static defaultProps = { initialError: false };

  constructor(props) {
    super(props);
    this.state = { error: props.initialError };
    this.retryTransition();
  }

  componentDidMount() {
    AuthStore.addChangeListener(this.retryTransition);
  }

  componentWillUnmount() {
    AuthStore.removeChangeListener(this.retryTransition);
  }

  retryTransition = () => {
    if (SignIn.attemptedTransition) {
      let transition = SignIn.attemptedTransition;
      SignIn.attemptedTransition = null;
      transition.retry();
    } else {
      this.context.router.replaceWith("index");
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const username = this.refs.username.getValue();
    const password = this.refs.password.getValue();
    AuthStore.signIn(username, password, (err, user) => {
      if (err || !user) {
        return this.setState({ error: true });
      }
      this.retryTransition();
    });
  }

  render() {
    return (
      <div>
        <h1>Sign In</h1>
        <Row>
          <Col md={8}>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.</p>
          </Col>
          <Col md={4}>
            <form onSubmit={this.handleSubmit} className={this.state.error ? "has-error" : null}>
              <Input type="text" ref="username" placeholder="username" label="Username" />
              <Input type="password" ref="password" placeholder="password" label="Password" />
              <Button type="submit" bsStyle="success" className="pull-right">Sign In</Button>
              {this.renderErrorBlock()}
            </form>
          </Col>
        </Row>
        <Row>
          <Col md={6} mdOffset={3}>
            <p>Don't have an account? You can <Link to="sign-up">sign up</Link></p>
          </Col>
        </Row>
      </div>
    );
  }

  renderErrorBlock() {
    return this.state.error ? (<p className="help-block">Bad login information</p>) : null;
  }
}
