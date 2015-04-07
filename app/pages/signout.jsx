var React = require("react");
var AuthStore = require("../stores/auth");

var SignOut = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  componentWillMount: function () {
    AuthStore.signOut(function () {
      this.context.router.replaceWith("index");
    }.bind(this));
  },

  render: function () {
    return null;
  }
});

module.exports = SignOut;
