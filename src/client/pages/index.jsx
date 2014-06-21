/** @jsx React.DOM */
'use strict';
var React = require('react');
var Counter = require('../components/counter');

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <h2>Index - Super Counter</h2>
        <Counter className={this.props.theme} />
      </div>
    );
  }
})
