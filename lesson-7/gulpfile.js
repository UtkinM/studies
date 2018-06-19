const   gulp = require('gulp'),
        browserSync = require('browser-sync').create(),
        sass = require('gulp-sass'),
        concatCss = require('gulp-concat-css'),
        autoprefixer = require('gulp-autoprefixer'),
        cleanCss = require('gulp-clean-css');

gulp.task('server', ['sass', 'min'], function () {

    browserSync.init({
        server: "./src"
    });

    gulp.watch("src/sass/**/*.sass", ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('min', function () {
    gulp.src('src/css/main.css')
            .pipe(cleanCss())
            .pipe(gulp.dest("src/dist/"))

});

gulp.task('sass', function () {
    gulp.src("src/sass/**/*.sass")
            .pipe(sass())
            .pipe(concatCss("main.css"))
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe(gulp.dest("src/css"))
            .pipe(browserSync.stream())
});

gulp.task('default', ['server']);
