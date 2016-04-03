'use strict';

const path = require('path');
const pkg = _require('package.json', _packagePaths());

if (!pkg) {
  throw new Error('Cannot find package.json');
}

function _packagePaths() {
  let filename = process.mainModule.filename;
  let levels = filename.split('/');
  let main = filename;
  let paths = levels.map((level, index) => main = main.substr(0, main.lastIndexOf('/')));
  paths = paths.filter((path) => path.length !== 0);
  return paths;
}

function _require(moduleName, paths) {
  let modulePaths = paths.filter((modulePath, index) => {
    try {
      let module = require(path.join(modulePath, moduleName));
      return true;
    } catch (e) {
      return false;
    }
  });

  if (modulePaths[0]) {
    return require(path.join(modulePaths[0], moduleName))
  } else {
    throw new Error(`Cannot find module '${moduleName}'`);
  }
}

function exportUtils() {
  for (let util in pkg._utils) {
    pkg._utils[util] = _require(util, process.mainModule.paths);
  }
  return pkg._utils;
}

module.exports = exportUtils();