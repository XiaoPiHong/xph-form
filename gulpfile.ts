import gulp from "gulp";
import ts from "gulp-typescript";
import path from "path";
import postcss from "gulp-postcss";

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

/** 编译CSS */
function buildCssTask(srcFolder: string[], distFolder: string) {
  const plugins = []; // 添加其他 PostCSS 插件

  return gulp.src(srcFolder).pipe(postcss(plugins)).pipe(gulp.dest(distFolder));
}

gulp.task("compile-ts", () =>
  buildTsTask("tsconfig.gulp.json", ["src/**/*.{ts,tsx,vue}"], "dist")
);

gulp.task("compile-css", () =>
  buildCssTask(["src/**/*.css", "!**/node_modules/**"], "dist")
);

gulp.task("default", gulp.parallel("compile-ts", "compile-css"));
