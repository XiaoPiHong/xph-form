// gulpfile.ts
import gulp from "gulp";
import ts from "gulp-typescript";
import cleanCSS from "gulp-clean-css";

const tsProject = ts.createProject("tsconfig.json");

gulp.task("typescript", () => {
  const tsResult = tsProject.src().pipe(tsProject());
  return tsResult.js.pipe(gulp.dest("dist"));
});

gulp.task("css", () => {
  return gulp.src("src/**/*.css").pipe(cleanCSS()).pipe(gulp.dest("dist/src"));
});

gulp.task("default", gulp.parallel("typescript", "css"));
