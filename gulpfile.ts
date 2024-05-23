import { task, parallel, src, dest, series } from "gulp";
import ts from "gulp-typescript";
import postcss from "gulp-postcss";
import path from "path";
import del from "del";
import rename from "gulp-rename";

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

  return src(srcFolder)
    .pipe(postcss(plugins))
    .pipe(
      rename(function (filePath) {
        const pathParts = filePath.dirname
          .split(path.sep)
          /** 主包打包css的时候会包含dist，所以需要去除dist */
          .filter((part) => part !== "dist");
        filePath.dirname = pathParts.join(path.sep);
      })
    )
    .pipe(dest(distFolder));
}

/** 复制文件 */
function copyTask(srcFolder, distFolder) {
  return src(srcFolder).pipe(dest(distFolder));
}

task("clean-dist", async () => {
  await del(["./src/packages/**/dist/**", "!**/node_modules/**"]);
});

task(
  "compile-common",
  series(
    () =>
      buildTsTask(
        "tsconfig.gulp.json",
        ["./src/packages/common/**/*.{ts,tsx}", "!**/node_modules/**"],
        "./src/packages/common/dist"
      ),
    () =>
      buildCssTask(
        ["./src/packages/common/**/*.css", "!**/node_modules/**"],
        "./src/packages/common/dist"
      )
  )
);

task(
  "compile-form",
  series(
    () =>
      buildTsTask(
        "tsconfig.gulp.json",
        ["./src/packages/form/**/*.{ts,tsx}", "!**/node_modules/**"],
        "./src/packages/form/dist"
      ),
    () =>
      buildCssTask(
        ["./src/packages/form/**/*.css", "!**/node_modules/**"],
        "./src/packages/form/dist"
      )
  )
);

task(
  "compile-table",
  series(
    () =>
      buildTsTask(
        "tsconfig.gulp.json",
        ["./src/packages/table/**/*.{ts,tsx}", "!**/node_modules/**"],
        "./src/packages/table/dist"
      ),
    () =>
      buildCssTask(
        ["./src/packages/table/**/*.css", "!**/node_modules/**"],
        "./src/packages/table/dist"
      )
  )
);

task(
  "compile-all",
  series(
    () =>
      buildTsTask(
        "tsconfig.gulp.json",
        ["./src/**/*.{ts,tsx}", "!**/node_modules/**"],
        "dist"
      ),
    () =>
      buildCssTask(
        ["./src/packages/*/dist/**/*.css", "!**/node_modules/**"],
        "dist/packages"
      ),
    () =>
      copyTask(
        ["./src/packages/*/package.json", "!**/node_modules/**"],
        "dist/packages"
      )
  )
);

// task("copy-md", () => copyTask(["*.md"], "dist"));

task(
  "default",
  series(
    "clean-dist",
    parallel("compile-common", "compile-table", "compile-form", "compile-all")
  )
);
