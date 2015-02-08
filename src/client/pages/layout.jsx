var React = require("react");
var Router = require("react-router");
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var Nav = require("react-bootstrap/Nav");
var Row = require("react-bootstrap/Row");
var Col = require("react-bootstrap/Col");

var ReactRouterBootstrap = require('react-router-bootstrap');
var NavItemLink = ReactRouterBootstrap.NavItemLink;

var AuthStore = require("../stores/auth");

var Layout = React.createClass({
  render: function() {
    if (!AuthStore.isLoggedIn()) {
      return <RouteHandler />;
    }
    return (
      <div className="container">
        <Row>
          <Col md={2}>
            <h3>Links</h3>
            <Nav bsStyle="pills" stacked>
              <NavItemLink to="index">Index</NavItemLink>
              <NavItemLink to="null-page">Null</NavItemLink>
            </Nav>
          </Col>
          <Col md={10} className="well">
            <RouteHandler />
          </Col>
        </Row>
      </div>
    );
  }
});

module.exports = Layout;
