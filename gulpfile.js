'use strict';

var path = require('path');

var gulp = require('gulp'),
    less = require('gulp-less'),
    webpack = require('gulp-webpack'),
    uglify = require('gulp-uglify'),
    watchify = require('watchify'),
    watch = require('gulp-watch');

var WebpackDevServer = require("webpack-dev-server");

var SRC = {
  LESS: './src/less/*.less',
  HTML: './src/*.html',
  JS: './src/js/**',
  JADE: './src/jade/**',
  IMG: './src/img/*'
};

var DIST = {
  CSS: './dist/css/',
  HTML: './dist/',
  JS: './dist/',
  IMG: './dist/img/'
};

var WEBPACK_CONFIG = require('./webpack.config');

gulp.task('html', function () {
  gulp.src(SRC.HTML)
    .pipe(gulp.dest(DIST.HTML));
});

gulp.task('img', function () {
  gulp.src(SRC.IMG)
    .pipe(gulp.dest(DIST.IMG));
});

gulp.task('js', function () {
  gulp.src(WEBPACK_CONFIG.entry)
    .pipe(webpack(WEBPACK_CONFIG))
  //.pipe(uglify())
    .pipe(gulp.dest(DIST.JS));
});

gulp.task('default', ['html', 'img', 'js']);

gulp.task('watch', function () {
  function rule (/* rules */) {
    var rules = [].slice.call(arguments);
    return function () {
      gulp.start(rules);
    };
  }

  watch(SRC.HTML, rule('html'));
  watch(SRC.IMG, rule('img'));

  var config = Object.create(WEBPACK_CONFIG);
  config.output.filename = 'js/bundle.js';
  
  var compiler = require('webpack')(WEBPACK_CONFIG);
  new WebpackDevServer(compiler, {
    contentBase: 'dist'
  }).listen(8080, '0.0.0.0', function(err) {
    if(err) throw err;
  });

});
