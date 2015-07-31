# gulp-assets-version-replace  [![Build Status](https://travis-ci.org/Black-Mirror/gulp-assets-version-replace.svg?branch=master)](https://travis-ci.org/Black-Mirror/gulp-assets-version-replace) [![npm version](https://badge.fury.io/js/gulp-assets-version-replace.svg)](http://badge.fury.io/js/gulp-assets-version-replace)

> 最简单的模板文件静态资源版本号替换方案

## 说明

js css 等静态文件复制成以时间戳命名的文件，并以这个新时间戳替换 html, php 等页面模板的老时间戳。

## 如果没有用过 gulp 请看 [http://gulpjs.com/](http://gulpjs.com/)

## 安装


```shell
npm install gulp-assets-version-replace --save-dev
```

在 gulpfile.js 中加上

```js
var assetsVersionReplace = require('gulp-assets-version-replace');
```

## 配置

### 配置选项

#### options.tsFiles

要复制成以时间戳命名的文件列表

Type: `Array`
Default value: `[]`


#### options.tsPrefix

时间戳前缀，比如生成 'taobao_new_home_auto_create_ts_1421999411.js'，前缀即是 `taobao_new_home_auto_create_ts_`。用于搜索、替换模板文件中的时间戳。**同一个模板文件中可能要替换两个或多个不同前缀组成的时间戳。**

Type: `String`
Default value: `auto_create_ts_`


#### options.tsVersionedFilesDest

复制出以时间戳命名的文件列表后目标文件夹

Type: `Array`
Default value: `[]`


#### options.replaceTemplateList

要替换时间戳的 html 或 php 或其他任意格式的文件模板

Type: `Array`
Default value: `[]`


### 配置 demo

> 静态资源如下：
    js_build/app.js
    css_build/webapp.css

*js_build 和 css_build 下的文件是 compass uglify 生成的文件*

配置如：

```js

gulp.task('assetsVersionReplace', function () {
    assetsVersionReplace({
      tsFiles: ['test/css_build/*.css', 'test/js_build/*.js'],
      tsPrefix: 'common_auto_create_ts_',
      tsVersionedFilesDest: 'test/dist/',
      replaceTemplateList: [
        'test/header.php',
        'test/footer.php',
        'test/submodule/header.php',
      ]
    })
});
```


    生成结果：
    dest/app.auto_create_ts_1421999411.js
    dest/webapp.auto_create_ts_1421999411.css


更复杂的配置(注意 tsPrefix 是不同的)：

```js

gulp.task('assetsVersionReplace', function () {
    assetsVersionReplace({
      tsFiles: ['test/css_build/*.css', 'test/js_build/*.js'],
      tsPrefix: 'common_auto_create_ts_',
      tsVersionedFilesDest: 'test/dist/',
      replaceTemplateList: [
        'test/header.php',
        'test/footer.php',
        'test/submodule/header.php',
      ]
    })
    assetsVersionReplace({
      tsFiles: ['test/submodule/css_build/*.css', 'test/submodule/js_build/*.js'],
      tsPrefix: 'submodule_auto_create_ts_',
      tsVersionedFilesDest: 'test/dist/',
      replaceTemplateList: [
        'test/submodule/header.php',
        'test/submodule/footer.php'
      ]
    })
});
```


    生成结果：
    dest/js_build/app.auto_create_ts_1421999411.js
    dest/css_build/webapp.auto_create_ts_1421999411.css
    dest/submodule/js_build/app.auto_create_ts_1421999411.js
    dest/submodule/css_build/webapp.auto_create_ts_1421999411.css



## Release History

* 2015-07-31   v0.1.0   Initial commit
