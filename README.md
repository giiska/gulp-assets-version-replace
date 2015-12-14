# gulp-assets-version-replace  [![Build Status](https://travis-ci.org/Black-Mirror/gulp-assets-version-replace.svg?branch=master)](https://travis-ci.org/Black-Mirror/gulp-assets-version-replace) [![npm version](https://badge.fury.io/js/gulp-assets-version-replace.svg)](http://badge.fury.io/js/gulp-assets-version-replace)


[中文文档](README-cn.md)


> **The simplest version manage solution of website assets.**
>  
>  Support manage assets version in template files of php, python Django, Express and etc.

## Example


#### 1. Your assets files
**Assets structure：**
 
```
	js_build/app.js
	css_build/webapp.css
```
*Files under js_build and css_build are generated by compass uglify*

**Links in templates：**

```html
<link href="static/dist/css_build/app.auto_create_ts_000.css" />
<link href="static/dist/css_build/desktop.auto_create_ts_000.css" />
```

*Note:  `auto_create_ts_000` is a placeholder for replacing with generated versions*

#### 2. Configs in gulpfile.js：

```js
gulp.task('assetsVersionReplace', function () {
    assetsVersionReplace({
      tsFiles: ['test/css_build/*.css', 'test/js_build/*.js'],
      tsPrefix: 'common_auto_create_ts_',
      tsVersionedFilesDest: 'test/dist/',
      replaceTemplateList: [
        'test/header.php',
        'test/footer.php',
        'test/submodule/header.php'
      ]
    })
});
```
#### 3. Run gulp task

`gulp assetsVersionReplace` in your terminal.

Your get these result:

* **Files named with generated version** 

```
    dest/app.auto_create_ts_1421999411.js
    dest/webapp.auto_create_ts_1421999411.css
```

* **LInks in template have been replaced with generated version**

```html
<link href="static/dist/css_build/app.auto_create_ts_1421999411.css" />
<link href="static/dist/css_build/desktop.auto_create_ts_1421999411.css" />
```

#### 4. Commit these build assets and changes in template file



## Install

```shell
npm install gulp-assets-version-replace --save-dev
```

In your gulpfile.js place this line:

```js
var assetsVersionReplace = require('gulp-assets-version-replace');
```

Form asset link as below in your template:

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>test</title>
  <link href="static/dist/css_build/app.auto_create_ts_000.css" />
  <link href="static/dist/css_build/desktop.auto_create_ts_000.css" />
</head>
<body>
```

**Notes:** 
-  `auto_create_ts_000` is a placeholder for replacing with generated versions
-  `auto_create_ts_` is prefix [see document](#optionstsprefix)


## Gulp Plugin Options

#### options.tsFiles

Array of globs. Files which will be copied to a new folder and named with gerenated version.

Type: `Array`
Default value: `[]`


#### options.tsPrefix

Prefix of gerenated version. 
E.g. prefix `taobao_new_home_auto_create_ts_`  will get result files like this  'taobao_new_home_auto_create_ts_1421999411.js' 

Generally no need config it excerpt there is conflict with other plugin.

Type: `String`
Default value: `auto_create_ts_`


#### options.tsVersionedFilesDest

The destination folder place the result files.

Type: `Array`
Default value: `[]`


#### options.replaceTemplateList

List of templates which contain assets links of `tsFiles` . Support whatever extension like php, python Django, Express and etc.


Type: `Array`
Default value: `[]`


## Release History

* 2015-12-13   v0.1.2   Update github repo link
* 2015-12-13   v0.1.1   Update doc
* 2015-07-31   v0.1.0   Initial commit
