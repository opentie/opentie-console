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
  LESS: './src/less/*.less',
  HTML: './src/*.html',
  JS: './src/js/index.js',
  FONT: './src/fonts/*'
};

var DIST = {
  CSS: './dist/css/',
  HTML: './dist/',
  JS: './dist/js/',
  FONT: './dist/fonts/'
};

gulp.task('less', function () {
  gulp.src(SRC.LESS)
    .pipe(less())
    .pipe(gulp.dest(DIST.CSS));
});

gulp.task('html', function () {
  gulp.src(SRC.HTML)
    .pipe(gulp.dest(DIST.HTML));
});

gulp.task('font', function () {
  gulp.src(SRC.FONT)
    .pipe(gulp.dest(DIST.FONT));
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

gulp.task('default', ['html', 'less', 'fonts', 'js']);

gulp.task('watch', function () {
  gulp.src(SRC.HTML)
    .pipe(watch(SRC.HTML))
    .pipe(gulp.dest(DIST.HTML));

  gulp.src(SRC.LESS)
    .pipe(watch(SRC.LESS))
    .pipe(less())
    .pipe(gulp.dest(DIST.CSS));

  gulp.src(SRC.FONT)
    .pipe(watch(SRC.FONT))
    .pipe(gulp.dest(DIST.FONT));

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
