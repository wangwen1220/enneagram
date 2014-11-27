// 引入 gulp
var gulp = require('gulp');

// 引入组件
var nib = require('nib');
// var btStylus = require('bootstrap-stylus');
var stylus = require('gulp-stylus');
// var cssmin = require('gulp-cssmin');
// var seajs = require('gulp-seajs');
// var CMDTrans = require('gulp-cmd-transport');
var coffee = require('gulp-coffee');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
// var concat = require('gulp-concat');
// var clean = require('gulp-clean');
// var imagemin = require('gulp-imagemin');
var watch = require('gulp-watch');
// var livereload = require('gulp-livereload');

var w = {
  app: {
    src: './**',
    dest: './',
    watch: ['./**/*.php', './**/*.htm', './**/*.html', './**/*.css', './**/*.js', './img/**/*']
  },
  stylus: {
    src: 'css/main.styl',
    dest: 'css',
    watch: 'css/*.styl'
  },
  coffee: {
    src: 'js/*.coffee',
    dest: 'js',
    watch: 'js/*.coffee'
  },
  js: {
    debug: 'js/*-debug.js',
    src: 'js/*.js',
    dest: 'js',
    watch: 'js/*.js'
  },
  img: {
    src: 'img/**/*',
    dest: 'img',
    watch: 'img/**/*'
  }
};

// 清空目录
// gulp.task('default', function() {
//   return gulp.src(w.app.dest, {read: false})
//     .pipe(clean());
// });

// 创建 stylus 任务
gulp.task('stylus', function() {
  gulp.src(w.stylus.src)
    .pipe(stylus({
      compress: true,
      use: [nib()]
    }))
    // .pipe(cssmin())
    .pipe(gulp.dest(w.stylus.dest));
    // .pipe(livereload());
});

// 创建 coffee 任务
gulp.task('coffee', function() {
  return gulp.src(w.coffee.src)
    .pipe(coffee())
    .pipe(uglify())
    .pipe(gulp.dest(w.coffee.dest));
});

// 合并压缩 JS
gulp.task('jsmin', function() {
  gulp.src(w.js.debug)
    .pipe(watch())
    // .pipe(concat('all.js'))
    // .pipe(rename({suffix: '-min'}))
    .pipe(rename(function(path) {
      path.basename = path.basename.replace(/-debug$/, '');
    }))
    .pipe(uglify())
    .pipe(gulp.dest(w.js.dest));
});

// 检查脚本
gulp.task('lint', function() {
  gulp.src(w.js.debug)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Copy all static images
// gulp.task('img', function() {
//   return gulp.src(w.img.src)
//     .pipe(imagemin({
//       optimizationLevel: 5
//     }))
//     .pipe(gulp.dest('build/img'));
// });

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(w.stylus.watch, ['stylus']);
  // gulp.watch(w.coffee.watch, ['coffee']);
  gulp.watch(w.js.debug, ['jsmin']);
  // gulp.watch(w.img.src, ['img']);
});

// livereload task
// gulp.task('livereload', function() {
//   livereload.listen();
//   gulp.watch(w.app.watch).on('change', livereload.changed);
// });

// The default task (called when you run `gulp` from cli)
// gulp.task('default', ['stylus', 'coffee', 'jsmin', 'watch']);
gulp.task('default', ['stylus', 'jsmin', 'watch']);