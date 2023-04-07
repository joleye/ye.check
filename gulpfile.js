/*
 * Copyright (c) 2019. joleye.com all rights reserved..
 */

const gulp=require('gulp');
const uglify=require('gulp-uglify');
const concat=require('gulp-concat');
const babel=require('gulp-babel');
const sourcemaps=require('gulp-sourcemaps');
const cssmin=require('gulp-cssmin');
const imagemin=require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const connect=require('gulp-connect');
const clean=require('gulp-clean');
const revCollector = require('gulp-rev-collector');
const rename = require('gulp-rename');
const js_path=['./src/js/*.js'];
// 压缩html
gulp.task('html',function(){
    const options = {
        collapseWhitespace:true,
        collapseBooleanAttributes:true,
        removeComments:true,
        removeEmptyAttributes:true, //清除所有的空属性
        removeScriptTypeAttributes:true,
        removeStyleLinkTypeAttributes:true,
        minifyJS:true,//压缩html中的javascript代码。
        minifyCSS:true //压缩html中的css代码。
    };
    return gulp.src('./src/html/*.html')
        .pipe(htmlmin(options))
        .pipe(revCollector({
            replaceReved:true
        }))
        .pipe(gulp.dest('./dist/html'))
        .pipe(connect.reload());
});
// 压缩js
gulp.task('js', ()=>{
    return gulp.src(js_path)
        //.pipe(sourcemaps.init())
        // babel编译
        .pipe(babel({
            presets: ['@babel/env']
        }))
        // concat会作合并，合并为1个js
        //.pipe(concat('bundle.min.js'))
        .pipe(uglify())
        //.pipe(sourcemaps.write())
        .pipe(rename({
            //basename: 'main',
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist/js/'))
        .pipe(connect.reload());
});
// 压缩style-css
gulp.task('style', ()=>{
    return gulp
        .src(['./src/css/**/*.css'])
        .pipe(concat('style.min.css'))
        // cssmin css压缩
        .pipe(cssmin())
        .pipe(gulp.dest('./dist/css/'))
        .pipe(connect.reload());
});
// 压缩images
gulp.task('images', ()=>{
    return gulp
        .src(['./src/images/**/*.jpg', './src/images/**/*.gif', './src/images/**/*.png'])
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({propressive: true}),
            imagemin.optipng({optimizationLevel: 5})
        ]))
        .pipe(gulp.dest('./dist/images/'));
});
gulp.task('watchs',function(){
    gulp.watch('./src/html/*.html', gulp.series('html'));
    gulp.watch('./src/**/*.css', gulp.series('style'));
    gulp.watch('./src/**/*.js', gulp.series('js'));
});
gulp.task('connect:app',function(){
    connect.server({
        root:'src',//根目录
        // ip:'192.168.3.162', 默认localhost
        livereload:true,//自动更新
        port:9999//端口
    })
});
gulp.task('connect:dist',function(cb){
    connect.server({
        root:'src',
        livereload:true,
        port:9999
    });
    cb(); //执行回调，表示这个异步任务已经完成，起通作用,这样会执行下个任务
});
gulp.task('clean:app', function() {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});
//gulp.series|4.0 依赖顺序执行
//gulp.parallel|4.0 多个依赖嵌套'html','css','js'并行
gulp.task('default', gulp.series(gulp.parallel('html','style','js','images')));
gulp.task('init', gulp.series('clean:app', gulp.parallel('html','style','js','images')));
//启动任务connect:app服务，并监控变化
gulp.task('dev', gulp.series('init', 'connect:app', 'watchs'));
// 生成打包文件
gulp.task('build', gulp.series('init'));
//启动任务connect:dist服务，生成打包文件后，监控其变化
gulp.task('server', gulp.series('connect:dist', 'build', 'watchs'));
