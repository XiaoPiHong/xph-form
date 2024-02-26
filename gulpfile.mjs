import gulp from "gulp";
import ts from "gulp-typescript";
import less from "gulp-less";
import replace from "gulp-replace";

const tsProject = ts.createProject("tsconfig.json");

// TypeScript 编译任务
gulp.task("compile-ts", () => {
  const tsResult = tsProject.src().pipe(tsProject());

  // 复制生成的 .d.ts 文件到输出目录
  tsResult.dts.pipe(gulp.dest("dist"));

  // 替换 LESS 文件引入为 CSS
  return tsResult.js
    .pipe(
      replace(
        /import\s+(\w+)\s+from\s+".*?\.less";/g,
        (match, variableName) => {
          return match.replace(".less", ".css");
        }
      )
    )
    .pipe(gulp.dest("dist"));
});

// LESS 编译任务
gulp.task("compile-less", () => {
  return gulp.src("src/**/*.less").pipe(less()).pipe(gulp.dest("dist/src"));
});

// 默认任务
gulp.task("default", gulp.parallel("compile-ts", "compile-less"));
