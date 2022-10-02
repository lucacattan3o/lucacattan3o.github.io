/**
 * Gulp File.js
 */

// Initialize modules
const {src, dest, watch, series} = require('gulp');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');

const proxy = false;

// File paths
const files = { 
  sassFiles:   './assets/scss/**/*.scss',
  sassEntry:   './assets/scss/style.scss',
  sassDest:    './assets/css/',
}

// ** Compile **
// -------------

function compileSass(){
  return src(files.sassEntry)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 10 versions', 'ie 9'))
    .pipe(cleanCSS())
    .pipe(dest(files.sassDest)
  );  
}

// ** Watch **
// -----------

function watchSass(){
  watch([files.startitSassFiles, files.kadminSassFiles], {interval: 1000, usePolling: true}, // Makes docker work
    series(
      compileSass,
    )
  );    
}

// ** Browser Sync **
// ------------------

function browserSyncInit(end){
  if (proxy){
    browserSync.init({
      proxy: proxy,
      open: true,
      files: [
        files.sassDest,
      ],
    });
  }
  end();
}

// Export the default Gulp task so it can be run
// Runs the scss and js tasks simultaneously
// then runs cacheBust, then watch task
exports.default = series(
  compileSass,
  browserSyncInit,
  watchSass,
);