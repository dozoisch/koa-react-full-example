"use strict";
import React, { PropTypes } from "react";
import TransitionGroup from "react/lib/ReactCSSTransitionGroup";
import Router, { Route, DefaultRoute, NotFoundRoute, Redirect } from "react-router";

import Navbar from "./components/navbar";
import { Authenticated as Layout, Anonymous as AnonymousLayout } from "./layouts";

import Application from "./application";

var IndexPage = require("./pages/index");
var NotFoundPage = require("./pages/notfound");
var NullPage = require("./pages/null");
var SignInPage = require("./pages/signin");
var SignUpPage = require("./pages/signup");
var SignOut = require("./pages/signout");

var container = document.getElementById("content");

var routes = (
  <Route handler={Application}>
    <Route name="anonymous" path="/auth" handler={AnonymousLayout}>
      <Route name="sign-in" path="signin" handler={SignInPage} />
      <Route name="sign-up" path="signup" handler={SignUpPage} />
      <Route name="sign-out" path="signout" handler={SignOut} />
      <NotFoundRoute handler={NotFoundPage} />
    </Route>
    <Route name="home" path="/" handler={Layout}>
      <DefaultRoute name="index" handler={IndexPage} />
      <Route name="null-page" path="null" handler={NullPage} />
      <Route name="profile" path="profile" handler={NullPage} />
      <NotFoundRoute handler={NotFoundPage} />
    </Route>
  </Route>
);

Router.run(routes, Router.HashLocation, function (Handler) {
  React.render(<Handler/>, container);
});


