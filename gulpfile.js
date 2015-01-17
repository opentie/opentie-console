'use strict';

var path = require('path');

var gulp = require('gulp'),
    less = require('gulp-less'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify'),
    watchify = require('watchify'),
    watch = require('gulp-watch'),
    sourcemaps = require('gulp-sourcemaps'),
    browserify = require('browserify');

var SRC = {
  LESS: './src/less/**/*.less',
  HTML: './src/*.html',
  JS: './src/js/index.js'
};

var DIST = {
  CSS: './dist/css/',
  HTML: './dist/',
  JS: './dist/js/'
};

gulp.task('less', function () {
  gulp.src(SRC.LESS)
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('html', function () {
  gulp.src(SRC.HTML)
    .pipe(gulp.dest('./dist/'));
});

var bundler = browserify({
  entries: [SRC.JS],
  debug: true
});

gulp.task('js', function () {
  return bundler
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(DIST.JS));
});

gulp.task('default', ['html', 'less', 'js']);

gulp.task('watch', ['default'], function () {
  gulp.src(SRC.HTML)
    .pipe(watch(SRC.HTML))
    .pipe(gulp.dest('./dist/'));

  gulp.src(SRC.LESS)
    .pipe(watch(SRC.LESS))
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./dist/css/'));

  var wbundler = watchify(bundler);
  function bundle () {
    return bundler
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest(DIST.JS));    
  }
  wbundler.on('update', bundle);
  bundle();
});
