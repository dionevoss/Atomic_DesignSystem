const Fs = require("fs");
const Path = require("path");
const Sass = require("node-sass");

const getComponents = () => {
  let allComponents = [];

  const types = ["atoms", "molecules", "organisms"];

  types.forEach((type) => {
    const allFiles = Fs.readdirSync(`src/${type}`).map((file) => ({
      input: Path.resolve(`src/${type}`, file),
      output: `build/${file.slice(0, -4) + "css"}`,
    }));

    allComponents = [...allComponents, ...allFiles];
  });

  return allComponents;
};

const compileFunc = (path, fileName) => {
  const result = Sass.renderSync({
    data: Fs.readFileSync(Path.resolve(path)).toString(),
    outputStyle: "expanded",
    outFile: "global.scss",
    includePaths: [Path.resolve("src")],
  }).css.toString();

  Fs.writeFileSync(Path.resolve(fileName), result);
};

compileFunc("src/global.scss", "build/global.css");
console.log(getComponents());
getComponents().forEach((component) => {
  compileFunc(component.input, component.output);
});
