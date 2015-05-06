import React, { PropTypes } from "react";

export default function makeFullHeightComponent(Component, heightCalculationFunc) {
  if (!heightCalculationFunc) {
    throw new Error("You must Provided a height calculation function");
  }
  return React.createClass({
    displayName: "FullHeightWrapper",

    propTypes: {
    },

    getInitialState() {
      return {
        height: 0,
      };
    },

    getComponent() {
      return this.refs.childComponent;
    },

    componentDidMount() {
      window.addEventListener("resize", this.calculateHeight);
      this.calculateHeight();
    },

    componentWillUnmount() {
      window.removeEventListener("resize", this.calculateHeight);
    },

    calculateHeight() {
      this.setState({
        height: heightCalculationFunc(),
      });
    },

    render() {
      return (<Component {...this.props} ref="childComponent" height={this.state.height} />);
    },
  });
}
