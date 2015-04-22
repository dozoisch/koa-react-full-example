"use strict";
import React from "react";
import Counter from "../components/counter";

const Index = React.createClass({
  displayName: "IndexPage",

  render() {
    return (
      <div>
        <h2>Index - Super Counter</h2>
        <Counter />
      </div>
    );
  }
});

export default Index;
