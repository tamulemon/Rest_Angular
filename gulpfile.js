var gulp = require('gulp');
var webpack = require('gulp-webpack');
var Server = require('karma').Server;

gulp.task('webpack:dev', function() {
	return gulp.src('app/js/client.js')
		.pipe(webpack({
		output: {
			filename: 'bundle.js'
		}
	}))
		.pipe(gulp.dest('build/'));
});

gulp.task('copyhtml', function() {
	return gulp.src('app/**/*.html')
		.pipe(gulp.dest('build/'));
});

gulp.task('copycss', function() {
	return gulp.src('app/**/*.css')
		.pipe(gulp.dest('build/'));
});

gulp.task('copyimg', function() {
	return gulp.src('app/img/*')
		.pipe(gulp.dest('build/img/'));
});

gulp.task('webpack:test', function() {
	return gulp.src('test/karma_tests/entry.js')
		.pipe(webpack({
		output: {
			filename: 'test_bundle.js'
		}
	}))
		.pipe(gulp.dest('test/karma_tests/'));
});

gulp.task('karmatest', ['webpack:test'], function(done) {
	new Server({configFile: __dirname + '/karma.conf.js'}, done).start();
});

gulp.task('build', ['webpack:dev','copyhtml', 'copycss', 'copyimg'] );
gulp.task('default', ['karmatest', 'build']);