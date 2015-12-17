'use strict';

var gulp = require('gulp'),
  gulpSequence = require('gulp-sequence'),
  assetsVersionReplace = require("../index");

var versionFileDist = 'dist/';

gulp.task('assetsVersionReplace', function () {
  gulp.src(['css_build/*.css', 'js_build/*.js'])
    .pipe(assetsVersionReplace({
      tsVersionedFilesDest: versionFileDist,
      replaceTemplateList: [
        'php-templates/header.php',
        'php-templates/footer.php'
      ]
    }))
    .pipe(gulp.dest(versionFileDist))
});


gulp.task('default', gulpSequence('assetsVersionReplace'))