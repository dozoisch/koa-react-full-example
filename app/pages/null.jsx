"use strict";
import React from "react";

export default class Null extends React.Component {
  constructor() {
    super();
    this.displayName = 'NullPage';
  }

  render() {
    return (
      <div>
        <h2>Coming Soon</h2>
        <div>This section is not done yet!</div>
      </div>
    );
  }
}
