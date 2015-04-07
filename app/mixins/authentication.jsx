var SignIn = require("../pages/signin");
var AuthStore = require("../stores/auth");

var Authentication = {
  statics: {
    willTransitionTo: function (transition) {
      if (!AuthStore.isLoggedIn()) {
        SignIn.attemptedTransition = transition;
        transition.redirect("sign-in");
      }
    }
  }
};

module.exports = Authentication;
