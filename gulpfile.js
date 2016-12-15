var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var nodemon     = require('gulp-nodemon');

gulp.task('serve', ['nodemon','sass'], function() {
   browserSync.init(null, {
		proxy: "http://localhost:3010",
        files: ["./**/*.*"],
        port: 3000,
	});
    gulp.watch("src/sass/*.scss", ['sass']);
    gulp.watch("./src/scripts/*.js").on('change', browserSync.reload);
    gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task('nodemon', function (cb) {
	
	var started = false;
	
	return nodemon({
		script: 'server.js'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true; 
		} 
	});
});

gulp.task('sass', function() {
    return gulp.src("src/sass/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("src/styles/"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);