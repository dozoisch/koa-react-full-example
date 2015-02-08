/** @jsx React.DOM */
"use strict";
var React = window.React = require("react");
var Router = require("react-router");
var RouteHandler = Router.RouteHandler;
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var Link = Router.Link;

var IndexPage = require("./pages/index");
var NullPage = require("./pages/null");

var container = document.getElementById("page-container");

var App = React.createClass({
  render: function () {
    return (
      <div className="row" >
        <div className="col-md-2">
          <h3>Links</h3>
          <ul className="nav nav-pills nav-stacked" >
            <li><Link to="index">Index</Link></li>
            <li><Link to="null-page">Null</Link></li>
          </ul>
        </div>
        <div className="col-md-10 well">
          <RouteHandler />
        </div>
      </div>
    );
  }
});

var routes = (
  <Route handler={App}>
    <DefaultRoute name="index" handler={IndexPage} />
    <Route name="null-page" path="/null" handler={NullPage} />
    <NotFoundRoute handler={IndexPage} />
  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, container);
});


