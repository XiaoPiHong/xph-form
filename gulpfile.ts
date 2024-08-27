const { task, parallel, src, dest, series } = require("gulp");
const ts = require("gulp-typescript");
const postcss = require("gulp-postcss");
const path = require("path");
const del = require("del");

/** 编译 ts */
function buildTsTask(tsconfigPath, srcFolder, distFolder) {
  const tsconfigFullPath = path.resolve(__dirname, tsconfigPath);
  const tsProject = ts.createProject(tsconfigFullPath);
  const tsResult = src(srcFolder).pipe(tsProject());

  return (
    tsResult
      /** 输出 JS 和 .d.ts 文件 */
      .pipe(dest(distFolder))
  );
}

/** 编译 CSS */
function buildCssTask(srcFolder, distFolder) {
  const plugins = []; // 添加其他 PostCSS 插件

  return src(srcFolder).pipe(postcss(plugins)).pipe(dest(distFolder));
}

task("clean-dist", async () => {
  await del(["./dist"]);
});

task(
  "compile-all",
  series(
    () => buildTsTask("tsconfig.json", "./src/**/*.{ts,tsx}", "dist"),
    () => buildCssTask("./src/**/*.css", "dist")
  )
);

task("default", series("clean-dist", parallel("compile-all")));
