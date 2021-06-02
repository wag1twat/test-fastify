const gulp = require("gulp");

gulp.task("clean", () => {
  const clean = require("gulp-clean");

  return gulp
    .src(["build/public"], { read: false, allowEmpty: true })
    .pipe(clean());
});

gulp.task("css", () => {
  const sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    sourcemaps = require("gulp-sourcemaps"),
    accpets = ["src/public/**/**/**/*.scss", "src/public/**/**/*.css"];

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

gulp.task("ts", () => {
  const accepts = ["src/**/**/**/*.ts"];
  const sourcemaps = require("gulp-sourcemaps");
  const ts = require("gulp-typescript");
  const uglify = require("gulp-uglify");

  return gulp
    .src(accepts)
    .pipe(sourcemaps.init())
    .pipe(ts.createProject("tsconfig.json")())
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("build"));
});

gulp.task("browserify", () => {
  const accepts = ["build/public/**/**/**/*.js"],
    browserify = require("gulp-browserify"),
    uglify = require("gulp-uglify");

  return gulp
    .src(accepts)
    .pipe(
      browserify({
        insertGlobals: true,
        transform: "babelify",
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest("build/public"));
});

gulp.task("build", gulp.series("clean", "pug", "css", "ts", "browserify"));
