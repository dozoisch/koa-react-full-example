"use strict";
import React, { Component } from "react";
import Counter from "../components/Counter";

class IndexPage extends Component {
  static displayName = "IndexPage";

  static requestData = (...args) => {
    return Counter.requestData(...args);
  };

  render() {
    return (
      <div>
        <h2>Index - Super Counter</h2>
        <Counter />
      </div>
    );
  }
};

export default IndexPage;
