#History

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
