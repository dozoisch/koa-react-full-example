/** @jsx React.DOM */
'use strict';
var React = window.React = require('react');
var reactNestedRouter = require('react-nested-router');
var Route = reactNestedRouter.Route;
var Link = reactNestedRouter.Link;

var IndexPage = require('./pages/index');
var NullPage = require('./pages/null');

var container = document.getElementById('page-container');

var App = React.createClass({
  render: function () {
    return (
      <div className='row' >
        <div className='col-md-2'>
          <h3>Links</h3>
          <ul className='nav nav-pills nav-stacked' >
            <li><Link to='index'>Index</Link></li>
            <li><Link to='null-page'>Null</Link></li>
          </ul>
        </div>
        <div className='col-md-10 well'>
          {this.props.activeRouteHandler()}
        </div>
      </div>
    );
  }
});

React.renderComponent(
  <Route handler={App} >
    <Route name='index' path='/' handler={IndexPage} />
    <Route name='null-page' path='/null' handler={NullPage} />
  </Route>
, container);


