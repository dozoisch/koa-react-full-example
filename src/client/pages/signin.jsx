var React = require("react");
var Router = require("react-router");

var Jumbotron = require("react-bootstrap/Jumbotron");
var Row = require("react-bootstrap/Row");
var Col = require("react-bootstrap/Col");
var Input = require("react-bootstrap/Input");
var Button = require("react-bootstrap/Button");

var AuthStore = require("../stores/auth");

var SignIn = React.createClass({
  displayName: "SignInPage",
  mixins: [ Router.Navigation ],

  statics: {
    attemptedTransition: null
  },
  getInitialState: function () {
    return {
      error: false
    };
  },

  componentWillMount: function () {
    this.retryTransition();
  },
  componentDidMount: function() {
    AuthStore.addChangeListener(this.retryTransition);
  },
  componentWillUnmount: function () {
    AuthStore.removeChangeListener(this.retryTransition);
  },

  handleSubmit: function (e) {
    e.preventDefault();
    var username = this.refs.username.getValue();
    var password = this.refs.password.getValue();
    AuthStore.signIn(username, password, function (err, user) {
      if (err || !user) {
        return this.setState({ error: true });
      }
      this.retryTransition();

    }.bind(this));
  },

  retryTransition: function () {
    if (SignIn.attemptedTransition) {
      var transition = SignIn.attemptedTransition;
      SignIn.attemptedTransition = null;
      transition.retry();
    } else {
      this.replaceWith("index");
    }
  },

  render: function () {
    var errors = this.state.error ? <p className="help-block">Bad login information</p> : "";
    return (
      <Jumbotron>
        <div className="container">
          <h1>Sign In</h1>
          <Row>
            <Col md={8}>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </Col>
            <Col md={4}>
              <form onSubmit={this.handleSubmit} className={this.state.error ? "has-error" : null}>
                <Input type="text" ref="username" placeholder="username" label="Username" />
                <Input type="password" ref="password" placeholder="password" label="Password" />
                <Button type="submit" bsStyle="success"  className="pull-right">Sign In</Button>
                {errors}
              </form>
            </Col>
          </Row>
        </div>
      </Jumbotron>
    );
  }
});

module.exports = SignIn;
