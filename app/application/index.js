import React, { PropTypes } from "react";
import TransitionGroup from "react/lib/ReactCSSTransitionGroup";

import{ RouteHandler } from "react-router";

import Navbar from "../components/navbar";

import makeFullHeightComponent from "../composition/full-height";

import AuthStore from "../stores/auth";

import "../less/main.less";

const App = React.createClass({
  displayName: "App",

  propTypes: {
    height: PropTypes.Number,
  },

  contextTypes: {
    router: PropTypes.func,
  },

  getInitialState() {
    return {
      hasLoaded: false,
    };
  },

  componentWillMount() {
    AuthStore.init();
  },

  componentDidMount() {
    AuthStore.addChangeListener(this.onLoad);
  },

  componentWillUnmount() {
    AuthStore.removeChangeListener(this.onLoad);
  },

  onLoad() {
    AuthStore.removeChangeListener(this.onLoad);
    this.setState({
      hasLoaded: true,
    });
  },

  render() {
    let key = this.context.router.getCurrentPath();
    return (
      <div>
        <Navbar brand="React Koa Gulp Mongoose Mocha Demo" />
          <div className="transition-crop main-container" style={{ minHeight: this.props.height }}>
            <TransitionGroup transitionName="transition">
              <RouteHandler key={key} />
            </TransitionGroup>
          </div>
      </div>
    );
  },
});

const FullHeightApp = makeFullHeightComponent(App, () => {
  let height = window.innerHeight;
  let navbarHeight = document.getElementsByClassName("main-container")[0].getBoundingClientRect().top;
  let footerHeight = document.getElementsByClassName("footer")[0].offsetHeight;
  return height - navbarHeight - footerHeight;
});

export default FullHeightApp;
