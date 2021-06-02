const gulp = require("gulp");

gulp.task("clean", () => {
  const clean = require("gulp-clean");

  return gulp
    .src(["build/public"], { read: false, allowEmpty: true })
    .pipe(clean());
});

gulp.task("css", () => {
  const sass = require("gulp-sass");
  const postcss = require("gulp-postcss");
  const sourcemaps = require("gulp-sourcemaps");
  const accpets = ["src/public/**/**/**/*.scss", "src/public/**/**/*.css"];

  return gulp
    .src(accpets)
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(sourcemaps.init())
    .pipe(postcss([require("precss"), require("autoprefixer")]))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("build/public/"));
});

gulp.task("pug", () => {
  const accepts = ["src/public/**/**/**/*.pug"];
  return gulp.src(accepts).pipe(gulp.dest("build/public"));
});

gulp.task("js", () => {
  const accepts = ["src/public/**/**/**/*.js"];
  return gulp.src(accepts).pipe(gulp.dest("build/public"));
});

gulp.task("browserify", () => {
  const accepts = ["build/public/**/**/**/*.js"];

  const browserify = require("gulp-browserify");

  return gulp
    .src(accepts)
    .pipe(
      browserify({
        insertGlobals: true,
      })
    )
    .pipe(gulp.dest("build/public"));
});
