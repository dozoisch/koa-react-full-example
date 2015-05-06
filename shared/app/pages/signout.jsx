import React, { PropTypes } from "react";
import AuthStore from "../../stores/auth";

const SignOut = React.createClass({
  displayName: "SignOut",

  contextTypes: {
    router: React.PropTypes.func
  },

  componentWillMount() {
    AuthStore.signOut(() => {
      this.context.router.replaceWith("index");
    });
  },

  render() {
    return null;
  },

});

export default SignOut;
