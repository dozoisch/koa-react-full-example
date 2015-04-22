"use strict";
import React from "react";
import request from "superagent";

import { Button, Badge } from "react-bootstrap";

const get = (url, cb) => {
  request.get(url)
  .set("Content-Type", "application/json")
  .end(cb);
}

const Counter =  React.createClass({
  displayName: "Counter",

  getInitialState() {
    return { count : this.props.initialCount || 0 };
  },

  componentWillMount() {
    get("/value", (err, res) => {
      this.setState({ count: res.body.count });
    });
  },

  onClickInc(event) {
    event.preventDefault();
    get("/inc", (err, res) => {
      this.setState({ count: res.body.count });
    });
  },

  onClickDec(event) {
    event.preventDefault();
    get("/dec", (err, res) => {
      this.setState({count: res.body.count});
    }.bind(this));
  },
  render() {
    return (
      <div>
        <h3>Counter</h3>
        <div className="counter">
          Count
          <Badge>{this.state.count}</Badge>
          <Button bsStyle="success" onClick={this.onClickInc}>Increment</Button>
          <Button bsStyle="danger" onClick={this.onClickDec}>Decrement</Button>
        </div>
      </div>
    );
  }
});

export default Counter;
