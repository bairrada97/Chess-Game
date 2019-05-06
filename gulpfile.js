var gulp = require('gulp');
var concat = require('gulp-concat');
var sync = require('browser-sync');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var del = require('del');
var htmlmin = require('gulp-htmlmin');
var autoprefixer = require('gulp-autoprefixer');
var refresh = require('gulp-refresh');



gulp.task('default', function() {
  gulp.src('scripts/*')
    .pipe(gulp.dest('dist'));
});

gulp.task('remove', function() {
  del(['js/*.js', 'css/*.css'], function() {});
});


gulp.task('copyJs', function() {
  gulp.src('scripts/*js')
    .pipe(gulp.dest('dist'));
});

gulp.task('pages', function() {
  return gulp.src('index.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('dist'));
});



gulp.task('concat', function() {
  return gulp.src('scripts/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist'));
});


gulp.task('scripting', function() {
  gulp.src('scripts/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist'))
    .pipe(refresh());

});


// gulp.task('scripting', ['concat'], function() { //
//   gulp.src('dist/*.js').pipe(obfuscator()).pipe(gulp.dest('dist'));
// });

gulp.task('serve', function() {
  sync({
    server: {
      baseDir: './',
      // index: 'outracoisa.html' se fosse outro nome q nao index
    },
    port: 8000
  });
  gulp.watch('*.html').on('change', sync.reload);
  refresh.listen();
  gulp.watch('styles/*.scss', ['sassing', sync.reload]);
  gulp.watch('scripts/*.js', ['scripting', sync.reload]);

});

gulp.task('sassing', function() {
  gulp.src('styles/*.scss')
    .pipe(sass())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe(concat('main.css'))
    .pipe(csso())
    .pipe(gulp.dest('dist'))
    .pipe(refresh());
})

gulp.task('default', ['copyJs', 'obfuscate']);
