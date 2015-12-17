# gulp-assets-version-replace 中文说明  [![Build Status](https://travis-ci.org/bammoo/gulp-assets-version-replace.svg?branch=master)](https://travis-ci.org/bammoo/gulp-assets-version-replace) [![npm version](https://badge.fury.io/js/gulp-assets-version-replace.svg)](http://badge.fury.io/js/gulp-assets-version-replace)


> 静态文件版本管理 Gulp 插件，最方便的静态文件发布方案。

## Features

- js css 等静态文件生成以文件内容的 md5 命名的新文件
- 只对有改动的静态文件生成新版本
- 自动替换所有模板引用，理论上支持所有模板语言 php, python Django, Expressjs ejs jade 等


## 如果没有用过 gulp 请看 [http://gulpjs.com/](http://gulpjs.com/)


### Demo

#### 1. 文件结构

**静态资源如下：**


```
js_build/app.js
css_build/webapp.css
```

* `js_build` 和 `css_build` 下的文件是 compass uglify 生成的文件*


**你模板中的链接如下：**

```html
<link href="static/dist/css_build/webapp.__placeholder__.css" />
```

*注意:  `__placeholder__` 是还未生成过版本的标识。*


#### 2. gulpfile.js 配置如：

```js

gulp.task('assetsVersionReplace', function () {
    assetsVersionReplace({
      tsFiles: ['test/css_build/*.css', 'test/js_build/*.js'],
      tsVersionedFilesDest: 'test/dist/',
      replaceTemplateList: [
        'test/header.php',
        'test/footer.php',
        'test/submodule/header.php',
      ]
    })
});
```

#### 3. 运行 gulp task
	
`gulp assetsVersionReplace` 
	
得到结果：

```
dest/js_build/app.c7ccb6b8ce569a65ed09d4256e89ec30.js
dest/css_build/webapp.2af81cda4dacbd5d5294539474076aae.css
```

* **模板中静态文件版本号也被自动替换了**

```html
<link href="static/dist/css_build/webapp.2af81cda4dacbd5d5294539474076aae.css" />
```

#### 4. 提交

如果是静态网站，你可以直接提交结果了。


## 安装


```shell
npm install gulp-assets-version-replace --save-dev
```

在 gulpfile.js 中加上

```js
var assetsVersionReplace = require('gulp-assets-version-replace');
```

运行 gulp task 后 Gulpfile.js 目录下会自动生成一个 `gulp-assets-version-replace-version.json` 的文件用于本地存储 json 格式的版本管理数据库。你可以添加到 .gitignore 或 .hgignore 中。

在你的模板中使用这样的格式：

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>test</title>
  <link href="static/dist/css_build/app.__placeholder__.css" />
  <link href="static/dist/css_build/desktop.__placeholder__.css" />
</head>
<body>
```

**注意:** 
`__placeholder__` 是还未生成过版本的标识。


## 配置

### 配置选项

#### options.tsFiles

要复制成以时间戳命名的文件列表

Type: `Array`
Default value: `[]`

#### options.tsVersionedFilesDest

复制出以时间戳命名的文件列表后目标文件夹

Type: `Array`
Default value: `[]`


#### options.replaceTemplateList

要替换时间戳的 html 或 php 或其他任意格式的文件模板

Type: `Array`
Default value: `[]`


## Release History

* 2015-12-15   v1.0.0   Refactor code, add feature of version store and compare
* 2015-12-13   v0.1.2   Update github repo link
* 2015-12-13   v0.1.1   Update doc
* 2015-07-31   v0.1.0   Initial commit


