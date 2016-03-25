/* */ 
(function watchTask(require, console) {
  'use strict';
  var gulp = require('gulp'),
      paths = require('../paths'),
      browserSync = require('browser-sync'),
      changed = function changed(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
      };
  gulp.task('watch', ['lint', 'build'], function onWatch() {
    gulp.watch([paths.lib + paths.files.unminified.js], ['annotate', browserSync.reload]).on('change', changed);
  });
}(require, console));
