"use strict";
var React = require("react");
var Counter = require("../components/counter");

var Authentication = require("../mixins/authentication");

module.exports = React.createClass({
  displayName: "IndexPage",
  mixins: [Authentication],
  render: function() {
    return (
      <div>
        <h2>Index - Super Counter</h2>
        <Counter />
      </div>
    );
  }
})
