const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");
const gcmq = require("gulp-group-css-media-queries");
const cleanCss = require("gulp-clean-css");
const runSequence = require("gulp-run-sequence");

gulp.task("serve", function() {
    browserSync.init({
        server: "./"
    });

    gulp.watch("sass/*.scss", ["sass"]);
    gulp.watch("css/style.css", browserSync.reload);
    gulp.watch("*.html").on("change", browserSync.reload);
    gulp.watch("js/*.js").on("change", browserSync.reload);
});

gulp.task("sass", function() {
    return gulp.src("sass/style.scss")
            .pipe(sass())
            .pipe(gulp.dest("css"));
});

gulp.task("groupCMQ", function() {
    return gulp.src("css/style.css")
            .pipe(gcmq())
            .pipe(gulp.dest("css"));
});

gulp.task("minify-CSS", function() {
    return gulp.src("css/style.css")
            .pipe(cleanCss())
            .pipe(gulp.dest("css"));
});

gulp.task("styles", function() {
    runSequence("sass", "groupCMQ", "minify-CSS");
});

gulp.task("default", ["serve"]);
