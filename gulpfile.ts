import gulp from "gulp";
import ts from "gulp-typescript";
import path from "path";
import postcss from "gulp-postcss";
import { compileTemplate } from "@vue/compiler-sfc";
import through2 from "through2";

/** 编译ts */
function buildTsTask(tsconfigPath, srcFolder, distFolder) {
  const tsconfigFullPath = path.resolve(__dirname, tsconfigPath);
  const tsProject = ts.createProject(tsconfigFullPath);
  const tsResult = gulp.src(srcFolder).pipe(tsProject());

  /** 输出JS和.d.ts文件 */
  return tsResult.pipe(gulp.dest(distFolder));
}

/** 编译Vue */
function buildVueTask(srcFolder, distFolder) {
  return gulp
    .src(srcFolder)
    .pipe(
      through2.obj((file, _, cb) => {
        if (path.extname(file.path) === ".vue") {
          const content = file.contents.toString();
          const { script, template } = parseVueFile(content);
          const compiledScript = compileScript(script, file.path);
          const compiledTemplate = compileTemplate({
            source: template,
            filename: path.basename(file.path),
            id: "x",
          }).code;
          file.contents = Buffer.from(compiledScript + compiledTemplate);
          file.path += ".js"; // 修改文件扩展名为 .js
        }
        cb(null, file);
      })
    )
    .pipe(gulp.dest(distFolder));
}

/** 解析Vue文件 */
function parseVueFile(content) {
  const [scriptStart, templateStart] = [
    content.indexOf("<script"),
    content.indexOf("<template"),
  ];
  const scriptEnd = content.indexOf("</script>") + "</script>".length;
  const templateEnd = content.indexOf("</template>") + "</template>".length;

  const script = content.slice(scriptStart, scriptEnd);
  const template = content.slice(templateStart, templateEnd);

  return { script, template };
}

/** 编译Vue单文件中的script部分 */
function compileScript(script, filePath) {
  // 这里可以使用 gulp-typescript 进行编译，并生成类型声明文件
  return script;
}

/** 编译CSS */
function buildCssTask(srcFolder, distFolder) {
  const plugins = []; // 添加其他 PostCSS 插件

  return gulp.src(srcFolder).pipe(postcss(plugins)).pipe(gulp.dest(distFolder));
}

/** 复制文件 */
function copyTask(srcFolder, distFolder) {
  return gulp.src(srcFolder).pipe(gulp.dest(distFolder));
}

gulp.task("copy", () => copyTask(["*.md", "src/packages/*.js"], "dist"));

gulp.task("compile-react", () =>
  buildTsTask(
    "tsconfig.gulp.json",
    ["src/packages/react-form/**/*.{ts,tsx}"],
    "dist/react-form"
  )
);

gulp.task(
  "compile-vue",
  gulp.parallel(() =>
    buildVueTask(
      ["src/packages/vue-form/**/*.{vue,ts}", "!**/node_modules/**"],
      "dist/vue-form"
    )
  )
);

gulp.task("compile-react-css", () =>
  buildCssTask(
    ["src/packages/react-form/**/*.css", "!**/node_modules/**"],
    "dist/react-form"
  )
);

gulp.task(
  "default",
  gulp.parallel("compile-react", "compile-react-css", "compile-vue", "copy")
);
