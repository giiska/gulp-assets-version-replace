var gulp = require('gulp');
var gutil = require('gulp-util');
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

function scanTsFiles(dest) {
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
    var ignore = false;
    // Check file changed or not
    if(!fileVersions || fileVersions.length == 0) {
      oldVersion = '__placeholder__';
      fileVersions = [thisVersion];
    }
    else {
      if(fileVersions.indexOf(thisVersion) <= -1) {
        oldVersion = fileVersions[fileVersions.length - 1];
        fileVersions.push(thisVersion);
      } else
        ignore = true;
    }

    db.set(file.relative, fileVersions)

    if(!ignore) {
      var oldPath = file.relative.replace(extname, '.' + oldVersion + extname);
      var newPath = file.relative.replace(extname, '.' + thisVersion + extname);
      reList.push({
        oldPath: oldPath,
        newPath: newPath,
        extname: extname
      })
      // rename file
      file.path = newPath;
      // Only pass modified files
      this.push(file);
    }

    cb();
  });
}

function replaceTemplate() {
  return through2.obj(function(file, enc, cb) {
    var content = file.contents.toString();
    for (var i = reList.length - 1; i >= 0; i--) {
      var replaceInfo = reList[i];
      content = content.replace(replaceInfo.oldPath, replaceInfo.newPath)
    }
    file.contents = new Buffer(content);
    cb(null, file)
  })
}

module.exports = function (options) {
  var tsFiles = options.tsFiles;
  var tsVersionedFilesDest = options.tsVersionedFilesDest;
  var replaceTemplateList = options.replaceTemplateList;

  gulp.src(tsFiles, {base: "."})
    .pipe(scanTsFiles(tsVersionedFilesDest))
    .pipe(gulp.dest(tsVersionedFilesDest))
    .on('end', function(err) {
      // async save
      db.save();

      // Can only start after scaned ts files as wait for collecting relist
      gulp.src(replaceTemplateList, { base: "./" })
        .pipe(replaceTemplate())
        .pipe(gulp.dest('.'));
    });


};