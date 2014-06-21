var React = require('react');
var IndexTopComponent = require('./pages/index');
var container = document.getElementById('page-container');

React.renderComponent(<IndexTopComponent theme="blue"/>, container);
