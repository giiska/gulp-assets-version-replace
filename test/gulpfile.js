'use strict';

var gulp = require('gulp'),
  gutil = require('gulp-util'),
  gulpSequence = require('gulp-sequence'),
  rename = require("gulp-rename"),
  assetsVersionReplace = require("../index");

gulp.task('assetsVersionReplace', function () {
    assetsVersionReplace({
      tsFiles: ['css_build/*.css', 'js_build/*.js'],
      tsPrefix: 'auto_create_ts_',
      tsVersionedFilesDest: 'dist/',
      replaceTemplateList: [
        'php-templates/header.php',
        'php-templates/footer.php'
      ]
    })
});


gulp.task('default', gulpSequence('assetsVersionReplace'))