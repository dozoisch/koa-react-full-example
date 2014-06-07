/** @jsx React.DOM */
'use strict';
var React = require('react');
var TodoApp = require('./todoapp');
var Counter = require('./counter');

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <h2>Index - Super Counter</h2>
        <Counter />
      </div>
    );
  }
})
