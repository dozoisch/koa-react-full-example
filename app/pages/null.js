import React, { Component } from "react";

export default class Null extends Component {
  static displayName = "NullPage";
  constructor() {
    super();
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
