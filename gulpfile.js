// Gulpfile.js
const autoprefixer = require('autoprefixer');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const cssnano = require('cssnano');
const gulp = require('gulp');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));

// Paths
const assetsDir = '_assets';
const jekyllAssetsDir = 'assets';

// Process styles, add vendor-prefixes, minify, then output the file to the appropriate location
gulp.task('scss', function() {
    let plugins = [
        autoprefixer(),
        cssnano()
    ];
    return gulp.src(assetsDir + '/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(gulp.dest(jekyllAssetsDir + '/css/'))
});

// Concatenate and minify JS files and output the result to the appropriate location
gulp.task('js', function () {
    return gulp.src([
        assetsDir + '/js/lib/*.js',
        assetsDir + '/js/*.js'
    ])
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(jekyllAssetsDir + '/js'))
    .pipe(rename('scripts.min.js'))
    .pipe(babel({
        presets:[["minify", {
            "builtIns": false
        }]]
    }))
    .pipe(gulp.dest(jekyllAssetsDir + '/js'))
});

// Watch files on default gulp task
gulp.task('default', function(){
    gulp.watch(assetsDir + '/scss/**/*.scss', gulp.series('scss')),
    gulp.watch(assetsDir + '/js/*.js', gulp.series('js'));
    return
});