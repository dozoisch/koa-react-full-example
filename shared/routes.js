import React from "react";
import { Route, DefaultRoute, NotFoundRoute } from "react-router";

import Root from "./app/Root";

import { AuthenticatedLayout, AnonymousLayout } from "./app/Layouts";

import IndexPage from "./app/IndexPage";
import NotFoundPage from "./app/pages/notfound";
import NullPage from "./app/pages/null";
import SignInPage from "./app/pages/signin";
import SignUpPage from "./app/pages/signup";
import SignOut from "./app/pages/signout";

export default (
  <Route handler={Root}>
    <Route name="anonymous" path="/auth" handler={AnonymousLayout}>
      <Route name="sign-in" path="signin" handler={SignInPage} />
      <Route name="sign-up" path="signup" handler={SignUpPage} />
      <Route name="sign-out" path="signout" handler={SignOut} />
      <NotFoundRoute handler={NotFoundPage} />
    </Route>
    <Route name="home" path="/" handler={AuthenticatedLayout}>
      <DefaultRoute name="index" handler={IndexPage} />
      <Route name="null-page" path="null" handler={NullPage} />
      <Route name="profile" path="profile" handler={NullPage} />
      <NotFoundRoute handler={NotFoundPage} />
    </Route>
  </Route>
);
