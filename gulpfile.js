"use strict";

var gulp        = require('gulp'),
    rename      = require('gulp-rename'),
    inject      = require('gulp-inject'),
    clean       = require('gulp-clean'),
    browserify  = require('browserify'),
    source      = require('vinyl-source-stream'),
    karma       = require('karma').server;

var CONFIG = {
    ENTRY_POINT: './src/app.js',
    SRC: './src',
    DIST: './dist',
    DEV: './dev'
};

/**
 *
 * Default Task
 *
 */
gulp.task('default', ['bundle-scripts']);

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
 * Task to bundle the js files using browserify
 *
 */
gulp.task('bundle-scripts', ['clean'], function () {
    var browserifyBundle = browserify(CONFIG.ENTRY_POINT).bundle()
        .pipe(source('app.js'))
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

/**
 *
 * Test Task
 *
 */

// load karma.conf.js
var karmaConfigHolder = {};
karmaConfigHolder.set = function(karmaConfig) {
    karmaConfigHolder.karmaConfig = karmaConfig;
};

require('./karma.conf.js')(karmaConfigHolder);

gulp.task('test', function () {
    karma.start(karmaConfigHolder.karmaConfig, function (exitCode) {
        console.log('Karma has exited with ' + exitCode);
        process.exit(exitCode);
    });
});
