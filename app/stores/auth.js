import request from "superagent";

let _user = null;
let _changeListeners = [];
let _initCalled = false;

const URLS = {
  AUTH: "/auth",
  SIGN_UP: "/signup",
  SIGN_OUT: "/signout",
};

function parseUser(user) {
  return {
    id: user.id,
    username: user.username,
  };
}

function _postAndHandleParseUser(url, username, password, done) {
  request.post(url)
    .set("Accept", "application/json")
    .set("Content-Type", "application/json")
    .send({ username: username, password: password })
    .end(function(err, res) {
      if (!err && res.body && res.body.user) {
        _user = parseUser(res.body.user);
        /* eslint-disable no-use-before-define */
        AuthStore.notifyChange();
        /* eslint-enable no-use-before-define */
      }
      if (done) {
        done(err, _user);
      }
    });
}

const AuthStore = {
  init: function() {
    if (_initCalled) {
      return;
    }
    _initCalled = true;
    this.fetchUser();
  },
  fetchUser: function() {
    request.get(URLS.AUTH)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .end(function(err, res) {
        if (!err && res.body && res.body.user) {
          _user = parseUser(res.body.user);
        }
        AuthStore.notifyChange();
      });
  },
  signIn: function(username, password, done) {
    _postAndHandleParseUser(URLS.AUTH, username, password, done);
  },
  signUp: function(username, password, done) {
    _postAndHandleParseUser(URLS.SIGN_UP, username, password, done);
  },
  signOut: function(done) {
    _user = null;
    request.get(URLS.SIGN_OUT)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .end(function(err, res) {
        if (!err) {
          AuthStore.notifyChange();
        }
        if (done) {
          done(null, res);
        }
      });
  },
  isLoggedIn: function() {
    return _user !== null;
  },
  getUser: function() {
    return _user;
  },
  notifyChange: function() {
    _changeListeners.forEach(function(listener) {
      listener();
    });
  },
  addChangeListener: function(listener) {
    _changeListeners.push(listener);
  },
  removeChangeListener: function(listener) {
    _changeListeners = _changeListeners.filter(function(l) {
      return listener !== l;
    });
  },
};

export default AuthStore;
