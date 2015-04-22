import React, { PropTypes } from "react";

const NotFound = React.createClass({
  displayName: "NotFoundPage",

  contextTypes: {
    router: PropTypes.func
  },

  render() {
    return (
      <div>
        <h1>404 <small>| Page Not Found</small></h1>
        <p>Sorry the following path</p>
        <pre>{this.context.router.getCurrentPath()}</pre>
        <p>does not exist on this site</p>
        <p>Are you sure you have the right url?</p>
      </div>
    );
  }
});

export default NotFound;
