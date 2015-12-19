var gulp = require('gulp');
var fs = require("fs");
var path = require("path");
var through2       = require('through2');
var md5 = require('md5');
var JSONStore = require('./json-store');
var PluginError = require('gulp-util/lib/PluginError');
// local version store 
var db = JSONStore(process.cwd() + '/gulp-assets-version-replace-version.json');
// replace list
var reList = [];

var PLUGIN_NAME = 'gulp-assets-version-replace';

function scanTsFiles(replaceTemplateList) {
  return through2.obj(function(file, enc, cb) {
    if (file.isNull()) {
      return cb(null, file);
    }
    if (file.isStream()) {
      return cb(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
    }
    var extname = path.extname(file.path);
    
    var fileVersions = db.get(file.relative);
    var thisVersion = md5(file.contents);
    var oldVersion;
    var fileChanged = false;
    // Check file changed or not
    if(!fileVersions || fileVersions.length == 0) {
      oldVersion = '__placeholder__';
      fileVersions = [thisVersion];
      // First time version
      fileChanged = true;
    }
    else {
      // Use the last key to comparison as only the last version is using in template
      oldVersion = fileVersions[fileVersions.length - 1];
      if(oldVersion != thisVersion) {
        // TODO: whether we should keep only last version?
        fileVersions.push(thisVersion);
        fileChanged = true;
      }
    }

    db.set(file.relative, fileVersions)

    // Only pass modified files
    if(fileChanged) {
      var oldPath = file.relative.replace(extname, '.' + oldVersion + extname);
      var newRelativePath = file.relative.replace(extname, '.' + thisVersion + extname);
      reList.push({
        oldPath: oldPath,
        newRelativePath: newRelativePath
      })
      var newPath = file.path.replace(extname, '.' + thisVersion + extname);
      file.path = newPath;
      this.push(file);
    }
    cb();

  }, function(cb) {
    // async save
    db.save();

    // Can only start after scaned ts files and finished collecting relist
    // Templates are always relative path of gulpfile.js
    gulp.src(replaceTemplateList, { base: "./" })
      .pipe(replaceTemplate())
      .pipe(gulp.dest('.'));

    cb();
  })
}

function replaceTemplate() {
  return through2.obj(function(file, enc, cb) {
    var content = file.contents.toString();
    for (var i = reList.length - 1; i >= 0; i--) {
      var replaceInfo = reList[i];
      content = content.replace(replaceInfo.oldPath, replaceInfo.newRelativePath)
    }
    file.contents = new Buffer(content);
    cb(null, file)
  })
}

module.exports = function (options) {
  var replaceTemplateList = options.replaceTemplateList;
  if(!replaceTemplateList)
    throw new PluginError(PLUGIN_NAME, 'Missing option');
  return scanTsFiles(replaceTemplateList)
}