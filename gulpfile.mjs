import gulp from "gulp";
import less from "gulp-less";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";

gulp.task("compile-less", () => {
  return gulp
    .src("src/**/*.less")
    .pipe(less())
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest("dist/src"));
});

gulp.task("default", gulp.series("compile-less"));
