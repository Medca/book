var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var babel = require('gulp-babel');
var reload = browserSync.reload;
gulp.task('js', function() {
	gulp.src('./src/index.js')
		.pipe(babel({
			presets: ['es2015'],
		}))
		.pipe(gulp.dest('./dist/'))
		.pipe(reload({
			stream: true
		}))
});

gulp.task('default', function() {
	browserSync.init({
		server: {
			baseDir: "./"
		},
		port: '8081'
	});
	gulp.watch(['src/*.js','*.html', '*.css'], ['js'])
});