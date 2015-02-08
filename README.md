# koa-react-full-example

[![Build Status][travis.img]][travis.url]
[![dependencies][deps.img]][deps.url]
[![devdependencies][devdeps.img]][devdeps.url]
[![Tasks][waffle.img]][waffle.url]

Full example using Koa, React, Passport, Mongoose, Gulp, Mocha, and on Travis

This example contains a MVC pattern that presents a simple counter to the client that increments and decrements a value in the Mongo Database with Mongoose. The UI is all handled with ReactJS. It uses the yield keyword from ES6.

This projects uses bleeding-edge technology. It also uses unstable version of Mongoose (3.9) for the support of yield.

### Prerequisite

* [NodeJS](http://nodejs.org/download/) > 0.11.16 || 0.12
* [npm](https://www.npmjs.org/)
* [MongoDB](http://www.mongodb.org/downloads)

### Installation

0. Checkout in a directory
0. `npm install`
0. `npm install -g gulp` *(might need sudo)*
0. `gulp install`
0. Try it and ensure tests passes with `npm test`

### Running the project

0. Build and start using `gulp dev`
0. Try access `localhost:3000` you should be redirected to `/login` because `/` is secured
0. Create a user using the url `localhost:3000/user/:username/:password`. This url doesn't really have a page as it is really just for creating a "testing" user. It might be updated in the future. It should redirect to login page with `usercreate=1` on success
0. Login your new created user, you should be redirected to the page with the counter!


### Build commands

**Build**

`gulp` or `gulp install`

**Run Develop**

`npm start` or `gulp dev`

**Run Tests**

`gulp && npm test`

### License

The plugin is under MIT license, please see the LICENSE file provided with the module.

### Soon

Updates to come:

 - Description of some design choices
 - Error handling
 - More in-depth React-Koa example

[travis.img]: https://api.travis-ci.org/dozoisch/koa-react-full-example.svg
[travis.url]: https://travis-ci.org/dozoisch/koa-react-full-example
[deps.img]: https://david-dm.org/dozoisch/koa-react-full-example.svg
[deps.url]: https://david-dm.org/dozoisch/koa-react-full-example
[devdeps.img]: https://david-dm.org/dozoisch/koa-react-full-example/dev-status.svg
[devdeps.url]: https://david-dm.org/dozoisch/koa-react-full-example#info=devDependencies
[waffle.img]: https://badge.waffle.io/dozoisch/koa-react-full-example.png?label=planned&title=Ready
[waffle.url]: https://waffle.io/dozoisch/koa-react-full-example
