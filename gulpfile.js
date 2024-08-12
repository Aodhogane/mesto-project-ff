const gulp = require('gulp');
const concat = require('gulp-concat-css');
const plumber = require('gulp-plumber');
const del = require('del');
const browserSync = require('browser-sync').create();
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const mediaquery = require('postcss-combine-media-query');
const cssnano = require('cssnano');
const htmlMinify = require('html-minifier');

function serve(done) {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
  done();
}

function html(done) {
  const options = {
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    sortClassName: true,
    useShortDoctype: true,
    collapseWhitespace: true,
    minifyCSS: true,
    keepClosingSlash: true
  };
  return gulp.src('src/**/*.html')
    .pipe(plumber())
    .on('data', function(file) {
      const bufferFile = Buffer.from(htmlMinify.minify(file.contents.toString(), options));
      file.contents = bufferFile;
    })
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({ stream: true }));
  done();
}

function css(done) {
  const plugins = [
    autoprefixer(),
    mediaquery(),
    cssnano()
  ];
  return gulp.src('src/**/**/*.css')
    .pipe(plumber())
    .pipe(concat('bundle.css'))
    .pipe(postcss(plugins))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({ stream: true }));
  done();
}

function images(done) {
  return gulp.src('src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}')
    .pipe(gulp.dest('dist/images'))
    .pipe(browserSync.reload({ stream: true }));
  done();
}

function buildFonts(done) {
  return gulp.src(['src/fonts/*.{woff,woff2}'])
    .pipe(gulp.dest('dist/fonts'));
  done();
}

function clean(done) {
  del.sync('dist');
  done();
}

function scripts(done) {
  return gulp.src(['src/scripts/**/*'])
    .pipe(gulp.dest('dist/scripts/'))
    .pipe(browserSync.reload({ stream: true }));
  done();
}

function watchFiles() {
  gulp.watch(['src/**/*.html'], html);
  gulp.watch(['src/**/**/*.css'], css);
  gulp.watch(['src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}'], images);
  gulp.watch(['src/fonts/*.{woff,woff2}'], buildFonts);
  gulp.watch(['src/scripts/**/*.js'], scripts);
}

const build = gulp.series(clean, gulp.parallel(html, css, images, buildFonts, scripts));
const watchapp = gulp.parallel(build, watchFiles, serve);

exports.html = html;
exports.css = css;
exports.images = images;
exports.buildFonts = buildFonts;
exports.clean = clean;
exports.scripts = scripts;

exports.build = build;
exports.watchapp = watchapp;
exports.default = watchapp;
