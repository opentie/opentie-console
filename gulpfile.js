'use strict';

var path = require('path');

var gulp = require('gulp'),
    less = require('gulp-less'),
    webpack = require('gulp-webpack-build'),
    uglify = require('gulp-uglify'),
    watchify = require('watchify'),
    watch = require('gulp-watch');

var WebpackDevServer = require("webpack-dev-server");

var SRC = {
  HTML: './src/*.html',
  JS: './src/js/**',
  JADE: './src/jade/**',
  IMG: './src/img/*'
};

var DIST = {
  HTML: './dist/',
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

gulp.task('webpack', function () {
  gulp.src(webpack.config.CONFIG_FILENAME)
    .pipe(webpack.compile(WEBPACK_CONFIG))
  //.pipe(uglify())
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['html', 'img', 'webpack']);

gulp.task('watch', function () {
  gulp.start('default');

  function rule (/* rules */) {
    var rules = [].slice.call(arguments);
    return function () {
      gulp.start(rules);
    };
  }

  watch(SRC.HTML, rule('html'));
  watch(SRC.IMG, rule('img'));

  var config = Object.create(WEBPACK_CONFIG);
  
  var compiler = require('webpack')(WEBPACK_CONFIG);
  new WebpackDevServer(compiler, {
    contentBase: 'dist'
  }).listen(8080, '0.0.0.0', function(err) {
    if(err) throw err;
  });

});
