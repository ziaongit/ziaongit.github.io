var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');


gulp.task('scripts', function() {
  return gulp.src(['bower_components/jquery/dist/jquery.min.js', 'bower_components/bootstrap/dist/js/bootstrap.min.js', 'resources/scripts/js/main.js'])
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('resources/scripts/dist'));
});

gulp.task('style', function () {	
	return gulp.src(['resources/styles/css/theme.min.css', 'resources/styles/css/main.css'])
		.pipe(concat('style.css'))
		.pipe(gulp.dest('resources/styles/dist'));
});

gulp.task('default', ['scripts', 'style']);