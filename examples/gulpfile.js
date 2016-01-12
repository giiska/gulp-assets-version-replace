'use strict';

var gulp = require('gulp'),
  gulpSequence = require('gulp-sequence'),
  assetsVersionReplace = require("../index");

gulp.task('assetsVersionReplace', function () {
  gulp.src(['css_build/*.css', 'js_build/*.js'], {base: '.'})
    .pipe(assetsVersionReplace({
      replaceTemplateList: [
        'php-templates/header.php',
        'php-templates/footer.php'
      ]
    }))
    .pipe(gulp.dest('dist/'))
});

gulp.task('assetsVersionReplace2', function () {
  gulp.src(['css_build/*.css', 'js_build/*.js'])
    .pipe(assetsVersionReplace({
      replaceTemplateList: [
        'php-templates/header.php',
        'php-templates/footer.php'
      ]
    }))
    .pipe(gulp.dest('dist/'))
});


gulp.task('default', gulpSequence('assetsVersionReplace'))
gulp.task('eg2', gulpSequence('assetsVersionReplace2'))