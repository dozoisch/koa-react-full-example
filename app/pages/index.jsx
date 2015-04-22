"use strict";
var React = require("react");
var Counter = require("../components/counter");

module.exports = React.createClass({
  displayName: "IndexPage",
  render: function() {
    return (
      <div>
        <h2>Index - Super Counter</h2>
        <Counter />
      </div>
    );
  }
})
