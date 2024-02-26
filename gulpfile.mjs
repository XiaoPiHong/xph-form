import gulp from "gulp";
import ts from "gulp-typescript";
import less from "gulp-less";
import postcss from "gulp-postcss";
import modules from "postcss-modules";


const tsProject = ts.createProject("tsconfig.json");

// TypeScript 编译任务
gulp.task("compile-ts", () => {
  const tsResult = tsProject.src().pipe(tsProject());

  // 复制生成的 .d.ts 文件到输出目录
  tsResult.dts.pipe(gulp.dest("dist"));

  // 输出编译后的 JavaScript 文件
  return tsResult.js.pipe(gulp.dest("dist"));
});

// LESS 编译任务
gulp.task("compile-less", () => {
  return gulp
    .src("src/**/*.less")
    .pipe(less())
    .pipe(
      postcss([
        modules({
          generateScopedName: "[local]__[hash:base64:5]", // 定义生成的类名格式
        }),
      ])
    )
    .pipe(gulp.dest("dist/src"));
});

// 默认任务
gulp.task("default", gulp.parallel("compile-ts", "compile-less"));
