"use strict";

var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    clean = require('gulp-clean');

/**
 *
 * Clean Task
 *
 */
gulp.task('clean', function() {
    return gulp.src(['dist'], {read: false})
        .pipe(clean());
});

/**
 *
 * Default Task
 *
 */
gulp.task('default', ['clean']);
