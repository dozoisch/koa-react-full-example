"use strict";
/**
 * Dependencies
 */
var app = require("../server");
var request = require("supertest").agent(app.listen());

describe("Index", function() {
  it("should render the page", function(done) {
    request.get("/")
    .expect(200)
    .end(done);
  });
});
