# koa-react-full-example

[![Join the chat at https://gitter.im/dozoisch/koa-react-full-example](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/dozoisch/koa-react-full-example?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![Pair on this](https://tf-assets-staging.s3.amazonaws.com/badges/thinkful_repo_badge.svg)](http://start.thinkful.com/react/?utm_source=github&utm_medium=badge&utm_campaign=koa-react-full-example)

[![Build Status][travis.img]][travis.url]
[![dependencies][deps.img]][deps.url]
[![devdependencies][devdeps.img]][devdeps.url]
[![Tasks][waffle.img]][waffle.url]

Full example using Koa, React, Passport, Mongoose, Webpack, Mocha, and on Travis

This example contains a MVC pattern that presents a simple counter to the client that increments and decrements a value in the Mongo Database with Mongoose. The UI is all handled with ReactJS. It uses the yield keyword from ES6.

This projects uses bleeding-edge technology. It also uses unstable version of Mongoose (3.9) for the support of yield.

### Prerequisite

* [NodeJS](http://nodejs.org/download/) > 0.11.16 || 0.12
* [npm](https://www.npmjs.org/)
* [MongoDB](http://www.mongodb.org/downloads)

### Installation

0. Checkout in a directory
0. `npm install`
0. Try it and ensure tests pass with `npm run build && npm test`

### Running the project

To run the project, you need two terminals.

0. In the first terminal run `npm run hot-dev-server`
0. In the second terminal run `npm start`
0. Try access `localhost:3000` You should normally get the login page.
0. Create a user using the sign up page "#/signup". It should log you in automatically and you should be redirected to the counter

### Build commands

**Static Build**

`npm run build`

**Running Prod**

`npm run prod`

**Run Tests**

`npm run build && npm test`

### License

The plugin is under MIT license, please see the LICENSE file provided with the module.

### Soon

Updates to come when I get some time:

 - Server side rendering with prod webpack config
 - Redux
 - Code coverage with iSparta istanbul.
 - ES6/Babel server side

[travis.img]: https://api.travis-ci.org/dozoisch/koa-react-full-example.svg
[travis.url]: https://travis-ci.org/dozoisch/koa-react-full-example
[deps.img]: https://david-dm.org/dozoisch/koa-react-full-example.svg
[deps.url]: https://david-dm.org/dozoisch/koa-react-full-example
[devdeps.img]: https://david-dm.org/dozoisch/koa-react-full-example/dev-status.svg
[devdeps.url]: https://david-dm.org/dozoisch/koa-react-full-example#info=devDependencies
[waffle.img]: https://badge.waffle.io/dozoisch/koa-react-full-example.png?label=planned&title=Ready
[waffle.url]: https://waffle.io/dozoisch/koa-react-full-example
