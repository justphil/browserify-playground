"use strict";

var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    rename = require('gulp-rename'),
    inject = require('gulp-inject'),
    clean = require('gulp-clean');

var CONFIG = {
    SRC: './src',
    DIST: './dist'
};

/**
 *
 * Default Task
 *
 */
gulp.task('default', ['clean', 'watch']);

/**
 *
 * Clean Task
 *
 */
gulp.task('clean', function () {
    return gulp.src([CONFIG.DIST], {read: false})
        .pipe(clean());
});

/**
 *
 * Several helper tasks
 *
 */
gulp.task('bundle-scripts', function () {
    var browserifyBundle = gulp.src(CONFIG.SRC + '/app.js')
        .pipe(browserify())
        .pipe(gulp.dest(CONFIG.DIST))
        .pipe(rename('../app.js'));

    return gulp.src(CONFIG.SRC + '/index.tpl.html')
        .pipe(inject(browserifyBundle, { addRootSlash: false }))
        .pipe(rename('index.html'))
        .pipe(gulp.dest(CONFIG.DIST));
});

gulp.task('watch', ['bundle-scripts'], function () {
    var watcher = gulp.watch(CONFIG.SRC + '/**/*.js', ['bundle-scripts']);
    watcher.on('change', function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', building scripts...');
    });
});
