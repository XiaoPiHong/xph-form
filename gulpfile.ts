import { task, parallel, src, dest } from "gulp";
import ts from "gulp-typescript";
import path from "path";
import postcss from "gulp-postcss";

/** 编译ts */
function buildTsTask(tsconfigPath, srcFolder, distFolder) {
  const tsconfigFullPath = path.resolve(__dirname, tsconfigPath);
  const tsProject = ts.createProject(tsconfigFullPath);
  const tsResult = src(srcFolder).pipe(tsProject());

  /** 输出JS和.d.ts文件 */
  return tsResult.pipe(dest(distFolder));
}

/** 编译CSS */
function buildCssTask(srcFolder, distFolder) {
  const plugins = []; // 添加其他 PostCSS 插件

  return src(srcFolder).pipe(postcss(plugins)).pipe(dest(distFolder));
}

/** 复制文件 */
function copyTask(srcFolder, distFolder) {
  return src(srcFolder).pipe(dest(distFolder));
}

task("copy-md", () => copyTask(["*.md"], "dist"));

task("compile-ts", () =>
  buildTsTask(
    "tsconfig.gulp.json",
    ["src/**/*.{ts,tsx}", "!**/node_modules/**"],
    "dist"
  )
);

task("compile-css", () =>
  buildCssTask(["src/**/*.css", "!**/node_modules/**"], "dist")
);

task("default", parallel("compile-ts", "compile-css", "copy-md"));
