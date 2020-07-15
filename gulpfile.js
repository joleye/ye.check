/*
 * Copyright (c) 2019. joleye.com all rights reserved..
 */

var gulp = require('gulp');
var rename = require('gulp-rename');
var less = require('gulp-less');

var BASEURL = './src/';
var JSSRC = BASEURL + '/js/*.js';
var LESSSRC = BASEURL + '/less/*.less';
var JSDEST = './js/';
var LESSDEST = './style/';

gulp.task('watch', function () {
    gulp.watch([JSSRC, LESSSRC], ['js', 'less']);
});

gulp.task('js', function () {
    return gulp.src(JSSRC)
    // .pipe(uglify().on('error', function (e) {//压缩
    //     console.log(e)
    // }))
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest(JSDEST));
});

gulp.task('less', function () {
    return gulp.src(LESSSRC)
        .pipe(less().on('error', function (e) {
            console.log(e)
        }))
        .pipe(rename({extname: '.css'}))
        .pipe(gulp.dest(LESSDEST));

    //g.pipe(minifycss());
});

gulp.task('default', ['watch'], function () {
    gulp.start('js', 'less');
});
