import React, { PropTypes, Component } from "react";
import connectToStore from "flummox/connect";
import request from "superagent";

import { Button, Badge } from "react-bootstrap";

const get = (url, cb) => {
  request.get(url)
  .set("Content-Type", "application/json")
  .end(cb);
}

class Counter extends Component {
  static displayName = "Counter";

  static contextTypes = {
    flux: PropTypes.object,
  };

  static requestData({ flux, state }) {
    const count = flux.getStore("count").getCount(1);
    if (count) {
      return Promise.resolve(count);
    }
    return flux.getActions("count").fetchCount(1);
  };

  onClickInc = (event) => {
    event.preventDefault();
    this.context.flux.getActions("count").increment(this.props.count);
  }

  onClickDec = (event) => {
    event.preventDefault();
    this.context.flux.getActions("count").decrement(this.props.count);
  }

  render() {
    const count = this.props.count ? this.renderCount() : this.renderLoading();
    return (
      <div>
        <h3>Counter</h3>
        {count}
      </div>
    );
  }

  renderCount() {
    return (
      <div className="counter">
        Count
        <Badge>{this.props.count.value}</Badge>
        <Button bsStyle="success" onClick={this.onClickInc}>Increment</Button>
        <Button bsStyle="danger" onClick={this.onClickDec}>Decrement</Button>
      </div>
    );
  }

  renderLoading() {
    return (
      <div>Loading...</div>
    );
  }
};

const ConnectedCounter = connectToStore(Counter, {
  count: store => ({
    count: store.getCount(1),
  })
});

ConnectedCounter.requestData = (...args) => {
  return Counter.requestData(...args);
};

export default ConnectedCounter;
