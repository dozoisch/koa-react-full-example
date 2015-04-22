import SignIn from "../pages/signin";
import AuthStore from "../stores/auth";

const Authentication = {
  statics: {
    willTransitionTo(transition) {
      if (!AuthStore.isLoggedIn()) {
        SignIn.attemptedTransition = transition;
        transition.redirect("sign-in");
      }
    }
  }
};

export default Authentication;
