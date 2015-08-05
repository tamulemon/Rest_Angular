var gulp = require('gulp');
var webpack = require('gulp-webpack');

gulp.task('webpack', function() {
	return gulp.src('app/*/*.js')
		.pipe(webpack ({
		output: {
			filename:'bundle.js'
		}
	}))
		.pipe(gulp.dest('build/'));
});


gulp.task('copy', function() {
	return gulp.src('app/*.html')
		.pipe(gulp.dest('build/'));
});

gulp.task('build', ['webpack','copy'] );
gulp.task('default', ['build']);