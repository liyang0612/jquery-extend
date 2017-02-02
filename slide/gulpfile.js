/**
 * Created by 李洋 on 2016/11/23.
 */
var gulp=require('gulp'),
    jshint=require('gulp-jshint'),
    cssmin=require('gulp-minify-css'),
    browserSync=require('browser-sync').create();

gulp.task('js',function () {
    gulp.src("src/js/*js")
        .pipe(jshint())
        .pipe(gulp.dest("dist/js"))
        .pipe(browserSync.stream())
})

gulp.task('css',function () {
    gulp.src("src/css/*.css")
        .pipe(cssmin())
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream())
})

gulp.task('server',function () {
    browserSync.init({
        server:"./dist"
    })
    gulp.watch("src/js/*",["js"]);
    gulp.watch("src/css/*",["css"]);
    gulp.watch("dist/*.html").on('change',browserSync.reload)
})

// gulp.task('server',['less'],function () {
//     browser.init({
//         server:"dist"
//     });
//     gulp.watch("src/less/*",['less']);
//     gulp.watch("dist/*").on('change',browser.reload)
// })

gulp.task("default",['server']);