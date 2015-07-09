import React from "react";
import request from "superagent";

import { Button, Badge } from "react-bootstrap";

const get = (url, cb) => {
  request.get(url)
  .set("Content-Type", "application/json")
  .end(cb);
};

export default class Counter extends React.Component {
  static displayName = "Counter";
  static propTypes = { initialCount: React.PropTypes.number };
  static defaultProps = { initialCount: 0 };

  constructor(props) {
    super(props);
    this.state = { count: props.initialCount };
  }

  componentWillMount() {
    get("/value", (err, res) => {
      if (err) {
        console.log(err);
        return;
      }
      this.setState({ count: res.body.count });
    });
  }

  onClickInc = (event) => {
    event.preventDefault();
    get("/inc", (err, res) => {
      if (err) {
        console.log(err);
        return;
      }
      this.setState({ count: res.body.count });
    });
  }

  onClickDec = (event) => {
    event.preventDefault();
    get("/dec", (err, res) => {
      if (err) {
        console.log(err);
        return;
      }
      this.setState({ count: res.body.count });
    });
  }

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
}
