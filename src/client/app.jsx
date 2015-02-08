"use strict";
var React = window.React = require("react");
var Router = require("react-router");
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var Navbar = require("./components/navbar");
var Layout = require("./pages/layout");

var IndexPage = require("./pages/index");
var NotFoundPage = require("./pages/notfound");
var NullPage = require("./pages/null");
var SignInPage = require("./pages/signin");
var SignUpPage = require("./pages/signup");
var SignOut = require("./pages/signout");

var container = document.getElementById("content");

var AuthStore = require("./stores/auth");

var App = React.createClass({
  displayName: "App",

  getInitialState: function() {
    return {
      hasLoaded: false,
    };
  },
  componentWillMount: function () {
    AuthStore.init();
  },
  componentDidMount: function () {
    AuthStore.addChangeListener(this.updateLoading);
  },
  componentWillUnmount: function () {
    AuthStore.removeChangeListener(this.updateLoading);
  },
  updateLoading: function () {
    AuthStore.removeChangeListener(this.updateLoading);
    this.setState({
      hasLoaded: true,
    });
  },

  render: function () {
    return (
      <div>
      <Navbar brand="React Koa Gulp Mongoose Mocha Demo" />
      <Layout hasLoaded={this.state.hasLoaded}/>
      </div>
    );
  }
});

var routes = (
  <Route handler={App}>
    <DefaultRoute name="index" handler={IndexPage} />
    <Route name="null-page" path="/null" handler={NullPage} />
    <Route name="profile" path="/profile" handler={NullPage} />
    <Route name="sign-in" path="/signin" handler={SignInPage} />
    <Route name="sign-up" path="/signup" handler={SignUpPage} />
    <Route name="sign-out" path="/signout" handler={SignOut} />
    <NotFoundRoute handler={NotFoundPage} />
  </Route>
);

Router.run(routes, Router.HashLocation, function (Handler) {
  React.render(<Handler/>, container);
});


