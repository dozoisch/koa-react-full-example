var React = require("react");
var Router = require("react-router");

var Col = require("react-bootstrap").Col;
var Input = require("react-bootstrap").Input;
var Button = require("react-bootstrap").Button;

var AuthStore = require("../stores/auth");

var SignUp = React.createClass({
  displayName: "SignUp",
  mixins: [Router.Navigation],

  getInitialState: function() {
    return {};
  },

  handleSubmit: function (e) {
    e.preventDefault();
    var username = this.refs.username.getValue();
    var password = this.refs.password.getValue();
    var repeatPassword = this.refs.repeatPassword.getValue();
    if (password === repeatPassword && password.trim()) {
      AuthStore.signUp(username, password, function (err, user) {
        if (err || !user) {
          return this.setState({ error: "Could not Create the User" });
        }
        this.replaceWith("index");
      }.bind(this));
    }
  },
  renderErrorBlock: function () {
    return (<p className="help-block">{this.state.error}</p>);
  },

  render: function () {
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
});

module.exports = SignUp;
