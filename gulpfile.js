var gulp       = require('gulp');
var gutil      = require('gulp-util');
// var sourcemamaps = require('gulp-sourcemaps');
var source     = require('vinyl-source-stream');
// var buffer     = require('vinyl-buffer');
var watchify   = require('watchify');
var browserify = require('browserify');
var reactify   = require('reactify');
var notify     = require('gulp-notify'); //Used in .pipe()
var nodeNotify     = require('node-notifier'); //Use not in .pipe()
var jshint     = require('gulp-jshint');
var stylish    = require('jshint-stylish');
var merge      = require('merge');
var less       = require('gulp-less');
var path       = require('path');

var bundlerConfig = {
  entries: ['./client/src/js/main.jsx'], // Only need initial file, browserify finds the deps
  transform: [reactify], // We want to convert JSX to normal javascript
  debug: true // Gives us sourcemapping
};

gulp.task('dev',['default', 'watch']);

gulp.task('default', ['scripts', 'less', 'copy']);

gulp.task('lint', ['lint:js', 'lint:jsx'])

gulp.task('scripts', function () {
  var bundler = browserify(bundlerConfig);
  bundle(bundler);
});

gulp.task('less', function () {
  return gulp.src('./client/src/styles/main.less')
    .pipe(less())
    .on('error', handleError('LESS'))
    .pipe(gulp.dest('./client/dist/static/'));
});

gulp.task('copy', function () {
  gulp.src('./client/src/index.html')
    .pipe(gulp.dest('./client/dist'));
});

gulp.task('watch', function () {
  var bundler;

  merge(bundlerConfig, { cache: {}, packageCache: {} }) // Requirement of watchify
  bundler = watchify(browserify(bundlerConfig));
  bundler.on('update', function () {
    //TODO throw in some duration stuff
    gutil.log('Rebundling');
    bundle(bundler);
  });

  bundle(bundler);

  gulp.watch('client/src/index.html', ['copy']);
  gulp.watch('./client/src/styles/**/*.less', ['less']);
});

gulp.task('lint:js', function () {
  gulp.src('client/src/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'))
    .on('error', handleError('lint:js'));
});

gulp.task('lint:jsx', function () {
  gulp.src('client/src/js/**/*.jsx')
    .pipe(jshint({ linter: require('jshint-jsx').JSXHINT }))
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'))
    .on('error', handleError('lint:jsx'));
});                                 

function bundle (bundler) {
  return bundler.bundle()
    .on('error', handleError('Browserify'))
    .pipe(source('bundle.js'))
    // Uglify, jsHint, etc...
    .pipe(gulp.dest('./client/dist/static/'));
}

function handleError (task) {
  return function (err) {
      notify.onError({
        message: task + ' failed, check the logs..',
        sound: 'Basso'
      })(err);
    
    gutil.log(gutil.colors.bgRed(task + ' error:'), gutil.colors.red(err));
  };
}