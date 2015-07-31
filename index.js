var gulp = require('gulp');
var gutil = require('gulp-util');
var fs = require("fs");

var rename = require("gulp-rename")
var replace = require("gulp-replace")
var PluginError = require('gulp-util/lib/PluginError');

// Consts
var pluginName = 'gulp-preprocess';

function createError(file, err) {
  console.warn(file, err);
}

module.exports = function (options) {
  var tsFiles = options.tsFiles;
  var tsVersionedFilesDest = options.tsVersionedFilesDest;
  var replaceTemplateList = options.replaceTemplateList;
  var tsPrefix = options.tsPrefix;
  // Default values
  if(!tsPrefix)
    tsPrefix = 'auto_create_ts_';

  var newTS = Math.round(+new Date() / 1000);
  var renameTs = function (path) {
    path.basename += ('.' + tsPrefix + newTS);
  }

  // console.log(newTS)
  // console.log(tsPrefix)
  console.log('prefix with: "' + tsPrefix + newTS + '"');

  //get the full asset text, like "text/javascript" src="dogeout/js_build/app.auto_create_ts_1415079600.js"
  var re1 = new RegExp("([\\\"|\\\'].*\\\." + tsPrefix + ")(\\\d+)(\\\.js[\\\"|\\\'])", "g");
  var re2 = new RegExp("([\\\"|\\\'].*\\\." + tsPrefix + ")(\\\d+)(\\\.css[\\\"|\\\'])", "g");
  // console.log(re1)
  // console.log(re2)

  gulp.src(tsFiles, {base: "."})
    .pipe(rename(renameTs))
    .pipe(gulp.dest(tsVersionedFilesDest));

  gulp.src(replaceTemplateList, { base: "./" })
    .pipe(replace(re1, "$1" + newTS + "$3"))
    .pipe(replace(re2, "$1" + newTS + "$3"))
    .pipe(gulp.dest('.'));

};