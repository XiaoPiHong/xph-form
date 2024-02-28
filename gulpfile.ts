import gulp from "gulp";
import ts from "gulp-typescript";
import path from "path";
import less from "gulp-less";
import replace from "gulp-replace";

/** 编译ts */
function buildTsTask(
  tsconfigPath: string,
  srcFolder: string[],
  distFolder: string
) {
  const tsconfigFullPath = path.resolve(__dirname, tsconfigPath);
  const tsProject = ts.createProject(tsconfigFullPath);
  const tsResult = gulp.src(srcFolder).pipe(tsProject());

  /** 复制生成的 .d.ts 文件到输出目录 */
  tsResult.dts.pipe(gulp.dest(distFolder));

  /** 替换 LESS 文件引入为 CSS */
  tsResult.js.pipe(
    replace(/import\s+(\w+)\s+from\s+".*?\.less";/g, (match, variableName) => {
      return match.replace(".less", ".css");
    })
  );

  /** 输出JS */
  return tsResult.js.pipe(gulp.dest(distFolder));
}

/** 编译less */
function buildLessTask(srcFolder: string[], distFolder: string) {
  return gulp.src(srcFolder).pipe(less()).pipe(gulp.dest(distFolder));
}

gulp.task("compile-ts", () =>
  buildTsTask("packages/tsconfig.json", ["packages/**/*.{ts,tsx,vue}"], "dist")
);

gulp.task("compile-less", () => buildLessTask(["packages/**/*.less"], "dist"));

gulp.task("default", gulp.parallel("compile-ts", "compile-less"));
