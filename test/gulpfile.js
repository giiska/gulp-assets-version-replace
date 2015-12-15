'use strict';

var gulp = require('gulp'),
  gulpSequence = require('gulp-sequence'),
  assetsVersionReplace = require("../index");

gulp.task('assetsVersionReplace', function () {
    assetsVersionReplace({
      tsFiles: ['css_build/*.css', 'js_build/*.js'],
      tsVersionedFilesDest: 'dist/',
      replaceTemplateList: [
        'php-templates/header.php',
        'php-templates/footer.php'
      ]
    })
});


gulp.task('default', gulpSequence('assetsVersionReplace'))