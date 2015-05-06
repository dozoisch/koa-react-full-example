"use strict";
import React, { PropTypes, Component } from "react";
import TransitionGroup from "react/lib/ReactCSSTransitionGroup";

import{ RouteHandler } from "react-router";

import Navbar from "../components/navbar";

import makeFullHeightComponent from "../composition/full-height";

import AuthStore from "../../stores/auth";

require("../less/main.less");

class Root extends Component {
  static displayName = "Root";

  static contextTypes = {
    router: PropTypes.func
  };

  static requestData = () => {
    return;
  };

  constructor() {
    super();
    this.state = {
      hasLoaded: false,
    };
  }

  componentWillMount() {
    AuthStore.init();
  }

  componentDidMount() {
    AuthStore.addChangeListener(this.updateLoading);
  }

  componentWillUnmount() {
    AuthStore.removeChangeListener(this.updateLoading);
  }

  updateLoading = () => {
    AuthStore.removeChangeListener(this.updateLoading);
    this.setState({
      hasLoaded: true,
    });
  }

  render() {
    return (
      <div>
        <Navbar brand="React Koa Gulp Mongoose Mocha Demo" />
        <div className="transition-crop main-container" style={{ "minHeight": this.props.height}}>
          <TransitionGroup transitionName="transition">
            {this.renderRouteHandler()}
          </TransitionGroup>
        </div>
      </div>
    );
  }

  renderRouteHandler() {
    if (!this.state.hasLoaded) {
      return <div>Loading...</div>;
    }
    const key = this.context.router.getCurrentPath();
    return (<RouteHandler key={key} />);
  }
};

let FullHeightRoot = makeFullHeightComponent(Root, () => {
  let height = window.innerHeight;
  let navbarHeight = document.getElementsByClassName("main-container")[0].getBoundingClientRect().top;
  let footerHeight = document.getElementsByClassName("footer")[0].offsetHeight;
  return height - navbarHeight - footerHeight;
});

FullHeightRoot.requestData = (...args) => {
  return Root.requestData(...args);
};


export default FullHeightRoot;
