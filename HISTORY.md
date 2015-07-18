#History

## 0.6.1
- Webpack Dev Server is now proxied by koa

## 0.6.0
- Migrated components to es6 (thanks to #31 dcodesmith)
- Bump all the deps
- Added eslint to the build

## 0.5.2
- Added thinkful badge
- Fixed issue with webpack version

## 0.5.1
- Linted

## 0.5.0
- Finish refactor to es6
- Refactored webpack build
- Added transitions
- Added Layouts
- Container based travis
- Bump deps

##0.4.3
- Preparing ground for Babel ES6 switch
- Added eslint
- Updated to mongoose 4.0
- Bump deps

##0.4.2
- dev-server-public/index now has an useful message

##0.4.1
- bump deps
- added npmignore

##0.4.0
- Dropped Gulp for Webpack
- Renamed client/src to app
- Added iojs to build targets
- Bump deps

##0.3.3
- Updated deps
- Removed 0.11 from the build
- Prepared for react-bootrstrap 0.15

##0.3.2
- Added sign up page

##0.3.1
- Added Not Found Page
- Better Layout Management

##0.3.0
- Now uses a real single pager
- Lot of refactor of the way the app works. It's now using a real authentication flow
- Added react-bootstrap
- Added some tests

##0.2.0
- Updated to React 0.12
- Bumped all deps to their most recent version (inluding co and the new co.wrap of 4.x)
- New layout that has less duplication
- Added Version in footer with link to changelog

##0.1.3
- bump deps
- updated guilpbuild to not crash on less/jsx errors

##0.1.2
- Fixed problem with browserify

##0.1.1
- updated deps

##0.1.0
- updated deps
- updated build configuration
- added waffle badge

## 0.0.8
- Added Log Out button
- Updated to React 0.11 (had to update nested-router to ^0.2.1)
- Updated gulp-react to 0.5.x, koa-router to 3.2.x
- Put build package in dev-deps instead of deps

## 0.0.7
- Adding react-nested-router in the example
- React is added with browserify
- Fixed a bug with the inc, dec links that were changing the url
- Updated react-less to 1.3.x

## 0.0.6
- Adding history file
- updated koa-sess to 0.4, koa-passport to 0.5, browserify-shim to 3.6
- Added test for root url
- merged refactor pr #2
- gulp now uses --harmony like Koa recommends
- config/koa now checks for existing setting app.keys so that session works!

## 0.0.5
- Authentication using koa-passport, passport-local and bcrypt#nan
- / (index) is now a secured route
- Updated tests
- Lots of refactor

## 0.0.4
- React is not fetch from CDN
- Updated gulp build
- Changed the way deps are pinned
- Basic error handler

## 0.0.3
- counter uses anchors
- updated README

## 0.0.2
- Travis build

## 0.0.1
- Adding gulp build
- Working mongoose + yield
- React bound to controuller
