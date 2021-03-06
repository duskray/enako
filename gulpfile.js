var gulp        = require('gulp');
var nodemon     = require('gulp-nodemon');
// var sass     = require('gulp-sass');
var browserify  = require('browserify');
var babelify    = require('babelify');
var watchify    = require('watchify');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var uglify      = require('gulp-uglify');
var gutil       = require('gulp-util');
var glob        = require("glob");

process.env.NODE_ENV = 'production';

var options = {
    cssSrcDir: 'app/stylesheets/**/*.css',
    cssDistDir: 'public',
    jsSrcDir: 'app/**/*.js',
    jsDistDir: 'public'
}

var files = glob.sync(options.jsSrcDir);

var b = browserify({
    entries: files,
    cache: {},
    packageCache: {},
    extensions: ['.jsx', '.js'],
    plugin: [watchify]
});

function bundle() {
    return b
        .transform("babelify", {presets: ["es2015", "react"]})
        .bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source('App.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(options.jsDistDir));
}

b.on('update', function(ids) {
    console.log(ids);
    bundle();
});
b.on('log', gutil.log);

gulp.task('build', bundle);
// gulp.task('watch', function() {
//     gulp.watch('server.js', ['console', ]);
// });
// gulp.task('console', function(){
//     console.log('server.js has changed.');
// })

gulp.task('default', ['watch']);


// gulp.task('sass', function() {
//     return gulp.src(options.sassSrcDir)
//         .pipe(sass().on('error', sass.logError))
//         .pipe(gulp.dest(options.sassDistDir));
// });

// gulp.task('sass:watch', function () {
//     gulp.watch(options.sassSrcDir, ['sass'])
//     .on('change', function(event) {
//       console.log('File ' + event.path + ' was ' + event.type);
//     });
// });

// gulp.task('default', ['build', 'sass', 'sass:watch']);


// gulp.task('build', function () {
//      var stream = gulp.src('app/**/*.js') 
//      .pipe(cache.filter()) 
//      .pipe(babel({
//           presets: ['react', 'es2015']
//      })) 
//      .pipe(cache.cache()) 
//      .pipe(gulp.dest('dist'))
//      return stream;
// })

// gulp.task('watch', ['build'], function () {
//     var stream = nodemon({
//         script: 'server.js', 
//         watch: './', 
//         ignore: ["dist/*"],
//         ext: 'js html',
//         tasks: ['build'] 
//     })
//     return stream;
// })

gulp.task('watch', ['build'], function () {
    var stream = nodemon({
        script: 'server.js', 
        watch: 'server.js'
    }).on('restart', () => {
        console.log("restart node server.js")
    });
    return stream;
})

// gulp.task('default', ['watch']);

