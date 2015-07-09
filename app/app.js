import React, { PropTypes } from "react";
import TransitionGroup from "react/lib/ReactCSSTransitionGroup";
import Router, { Route, DefaultRoute, NotFoundRoute, Redirect } from "react-router";

import Navbar from "./components/navbar";
import { Authenticated as Layout, Anonymous as AnonymousLayout } from "./layouts";

import Application from "./application";

import IndexPage from "./pages/index";
import NotFoundPage from "./pages/notfound";
import NullPage from "./pages/null";
import SignInPage from "./pages/signin";
import SignUpPage from "./pages/signup";
import SignOut from "./pages/signout";

const container = document.getElementById("content");

const routes = (
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

Router.run(routes, Router.HashLocation, (Handler) => {
  React.render(<Handler/>, container);
});
