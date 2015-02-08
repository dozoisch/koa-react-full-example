var request = require("superagent");

var _user = null;
var _changeListeners  = [];
var _initCalled = false;

var URLS = {
  AUTH: "/auth",
  SIGN_UP: "/signup",
  SIGN_OUT: "/signout"
};

var AuthStore = {
  init: function () {
    if(_initCalled) {
      return;
    }
    _initCalled = true;
    this.fetchUser();
  },
  fetchUser: function () {
    request.get(URLS.AUTH)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .end(function (err, res) {
        if (!err && res.body && res.body.user) {
          _user = parseUser(res.body.user);
        }
        AuthStore.notifyChange();
      });
  },
  signIn: function (username, password, done) {
    _postAndHandleParseUser(URLS.AUTH, username, password, done);
  },
  signUp: function (username, password, done) {
    _postAndHandleParseUser(URLS.SIGN_UP  , username, password, done);
  },
  signOut: function (done) {
    _user = null;
    request.get(URLS.SIGN_OUT)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .end(function (err, res) {
        if (!err) {
          AuthStore.notifyChange();
        }
        if (done) {
          done(null, res);
        }
      });
  },
  isLoggedIn: function () {
    return _user !== null;
  },
  getUser: function () {
    return _user;
  },
  notifyChange: function() {
    _changeListeners.forEach(function (listener) {
      listener();
    });
  },
  addChangeListener: function (listener) {
    _changeListeners.push(listener);
  },
  removeChangeListener: function (listener) {
    _changeListeners = _changeListeners.filter(function (l) {
      return listener !== l;
    });
  },
};

function _postAndHandleParseUser (url, username, password, done) {
  request.post(url)
    .set("Accept", "application/json")
    .set("Content-Type", "application/json")
    .send({ username: username, password: password })
    .end(function (err, res) {
      if (!err && res.body && res.body.user) {
        _user = parseUser(res.body.user);
        AuthStore.notifyChange();
      }
      if (done) {
        done(err, _user);
      }
    });
}

function parseUser (user) {
  return {
    id: user.id,
    username: user.username,
  };
}

module.exports = AuthStore;
