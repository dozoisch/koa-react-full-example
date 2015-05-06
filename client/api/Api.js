import request from "superagent";

const BASE_URL = process.env.API_URL;

class Api {

  get BASE_URL() {
    return BASE_URL;
  }

  _doGet(url) {
    return new Promise((resolve, reject) => {
      request.get(url)
      .accept("json")
      .type("json")
      .end((err, res) => {
        if (err) { return reject(err); }
        return resolve(res);
      });
    });
  }

  _doPost(url, data = {}) {
    return this._doSendDataRequest(url, data);
  }

  _doPut(url, data = {}) {
    return this._doSendDataRequest(url, data, "put");
  }

  _doSendDataRequest(url, data, method = "post") {
    return new Promise((resolve, reject) => {
      request[method](url)
      .send(data)
      .accept("json")
      .type("json")
      .end((err, res) => {
        if (err) { return reject(err); }
        return resolve(res);
      });
    });
  }
};

export default Api;
