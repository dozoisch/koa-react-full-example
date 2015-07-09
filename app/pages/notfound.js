import React, { PropTypes } from "react";

export default class NotFound extends React.Component {
  constructor() {
    super();
    this.displayName = 'NotFoundPage';
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

NotFound.contextTypes = { router: React.PropTypes.func };
