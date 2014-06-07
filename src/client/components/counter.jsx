/** @jsx React.DOM */
'use strict';
var React = require('react');
var request = require('superagent');

module.exports = React.createClass({
  getInitialState: function () {
    return { count : this.props.initialCount || 0 };
  },
  componentWillMount: function () {
    request.get('/value')
    .set('Content-Type', 'application/json')
    .end(function (res) {
      this.setState({count: res.body.count});
    }.bind(this));
  },
  onClickInc: function (event) {
    request.get('/inc')
    .set('Content-Type', 'application/json')
    .end(function (res) {
      this.setState({count: res.body.count});
    }.bind(this));
  },
  onClickDec: function (event) {
    request.get('/dec')
    .set('Content-Type', 'application/json')
    .end(function (res) {
      this.setState({count: res.body.count});
    }.bind(this));
  },
  render: function () {
    return (
      <div>
        <h3>Counter</h3>
        <div> Count&nbsp;
          <span onClick={this.onClickInc}>(Click to increment)</span>&nbsp;
          <span onClick={this.onClickDec}>(Click to decrement)</span>
          <span>:&nbsp;{this.state.count}</span>
        </div>
      </div>
    );
  }
});

