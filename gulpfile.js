'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');

// our browser-sync config + nodemon chain
gulp.task('default', ['browser-sync'], function () {
    gulp.watch(['public/**/*.html'], reload);
    gulp.watch('./public/**/*.js', reload);
	gulp.watch('./public/**/*.css', reload);
	gulp.watch(['./server.js'], ['bs-delay']);
});

// give nodemon time to restart
gulp.task('bs-delay', function () {
  setTimeout(function () {
    reload({ stream: false });
  }, 1000);
});

// our gulp-nodemon task
gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:9000",
        files: ["public/**/*.*"],
        browser: "default",
        port: 7000,
        notify: true
	});
});




gulp.task('nodemon', function (cb) {
	
	var started = false;
	
	return nodemon({
		script: 'server.js',
        ignore: [
      'gulpfile.js',
      'node_modules/',
      'public/'
    ]
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true; 
		} 
	}).on('restart', function () {
    setTimeout(function () {
      reload({ stream: false });
    }, 1000);
  });
});