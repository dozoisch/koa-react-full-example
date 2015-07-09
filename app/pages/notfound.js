import React, { PropTypes, Component } from "react";

export default class NotFound extends Component {
  static displayName = "NotFoundPage";
  static contextTypes = { router: PropTypes.func };

  constructor() {
    super();
  }

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
}
