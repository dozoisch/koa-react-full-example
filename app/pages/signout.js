import React, { PropTypes } from "react";
import AuthStore from "../stores/auth";

export default class SignOut extends React.Component {
  constructor() {
    super();
    this.displayName = 'SignOut';
  }

  componentWillMount() {
    AuthStore.signOut(() => {
      this.context.router.replaceWith("index");
    });
  }

  render() {
    return null;
  }
}

SignOut.contextTypes = { router: React.PropTypes.func };
