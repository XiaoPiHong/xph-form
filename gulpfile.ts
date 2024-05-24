import { task, parallel, src, dest, series } from "gulp";
import ts from "gulp-typescript";
import postcss from "gulp-postcss";
import path from "path";
import del from "del";
import tap from "gulp-tap";

/** 编译ts */
function buildTsTask(tsconfigPath, srcFolder, distFolder) {
  const tsconfigFullPath = path.resolve(__dirname, tsconfigPath);
  const tsProject = ts.createProject(tsconfigFullPath);
  const tsResult = src(srcFolder).pipe(tsProject());

  return (
    tsResult
      .pipe(
        /** 别名替换 */
        tap((file) => {
          /** 获取当前文件的路径 */
          const filePath = file.path;
          const relativePath = path
            .relative(path.dirname(filePath), "dist/packages")
            .replace(/\\/g, "/");
          file.contents = Buffer.from(
            file.contents.toString().replace(/@xph-form\//g, relativePath + "/")
          );
        })
      )
      /** 输出JS和.d.ts文件 */
      .pipe(dest(distFolder))
  );
}

/** 编译CSS */
function buildCssTask(srcFolder, distFolder) {
  const plugins = []; // 添加其他 PostCSS 插件

  return src(srcFolder).pipe(postcss(plugins)).pipe(dest(distFolder));
}

/** 复制文件 */
// function copyTask(srcFolder, distFolder) {
//   return src(srcFolder).pipe(dest(distFolder));
// }

task("clean-dist", async () => {
  await del(["./src/packages/**/dist/**", "!**/node_modules/**"]);
});

// task(
//   "compile-common",
//   series(
//     () =>
//       buildTsTask(
//         "tsconfig.gulp.json",
//         ["./src/packages/common/**/*.{ts,tsx}", "!**/node_modules/**"],
//         "./src/packages/common/dist"
//       ),
//     () =>
//       buildCssTask(
//         ["./src/packages/common/**/*.css", "!**/node_modules/**"],
//         "./src/packages/common/dist"
//       )
//   )
// );

// task(
//   "compile-form",
//   series(
//     () =>
//       buildTsTask(
//         "tsconfig.gulp.json",
//         ["./src/packages/form/**/*.{ts,tsx}", "!**/node_modules/**"],
//         "./src/packages/form/dist"
//       ),
//     () =>
//       buildCssTask(
//         ["./src/packages/form/**/*.css", "!**/node_modules/**"],
//         "./src/packages/form/dist"
//       )
//   )
// );

// task(
//   "compile-table",
//   series(
//     () =>
//       buildTsTask(
//         "tsconfig.gulp.json",
//         ["./src/packages/table/**/*.{ts,tsx}", "!**/node_modules/**"],
//         "./src/packages/table/dist"
//       ),
//     () =>
//       buildCssTask(
//         ["./src/packages/table/**/*.css", "!**/node_modules/**"],
//         "./src/packages/table/dist"
//       )
//   )
// );

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
        ["./src/packages/**/*.css", "!**/node_modules/**"],
        "dist/packages"
      )
  )
);

// task("copy-md", () => copyTask(["*.md"], "dist"));

task("default", series("clean-dist", parallel("compile-all")));
