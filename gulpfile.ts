import gulp from "gulp";
import ts from "gulp-typescript";
import path from "path";

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

  /** 输出JS */
  return tsResult.js.pipe(gulp.dest(distFolder));
}

gulp.task("compile-ts", () =>
  buildTsTask(
    "tsconfig.gulp.json",
    ["src/**/*.{ts,tsx,vue}", "!src/packages/react-form/src/index.tsx"],
    "dist"
  )
);

gulp.task("default", gulp.parallel("compile-ts"));
