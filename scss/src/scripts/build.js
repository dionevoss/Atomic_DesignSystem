const Fs = require("fs");
const Path = require("path");
const Sass = require("node-sass");

const response = Sass.renderSync({
  data: Fs.readFileSync(Path.resolve("src/global.scss")).toString(),
  outputStyle: "expanded",
  outFile: "global.scss",
  includePaths: [Path.resolve("src")],
});

Fs.writeFileSync(Path.resolve("build/global.css"), response.css.toString());
