import React, { Component, PropTypes } from "react";
import AuthStore from "../stores/auth";

export default class SignOut extends Component {
  static displayName = "SignOut";
  static contextTypes = { router: PropTypes.func };

  constructor() {
    super();
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

