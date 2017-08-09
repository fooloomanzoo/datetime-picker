const del = require('del');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const gulpdebug = require('gulp-debug');
const gulpHelp = require('gulp-help')(gulp);
const gulpfilter = require('gulp-filter');
const mergeStream = require('merge-stream');
const polymerBuild = require('polymer-build');
const babel = require('gulp-babel');
const babelPresetES2015 = require('babel-preset-es2015');
const babiliPreset = require('babel-preset-babili');
const babelPresetES2015NoModules = babelPresetES2015.buildPreset({}, {modules: false});

const cssSlam = require('css-slam').gulp;
const htmlMinifier = require('gulp-html-minifier');

const polymerJson = require('./polymer.json');
const buildRoot = 'build';
const debug = false;

// Waits for the given ReadableStream
function waitFor(stream) {
  return new Promise((resolve, reject) => {
    stream.on('end', resolve);
    stream.on('error', reject);
  });
}

function build(prefix, compile) {
  return function() {
    return new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars

      let polymerProject = new polymerBuild.PolymerProject(polymerJson);
      let sourcesStreamSplitter = new polymerBuild.HtmlSplitter();
      let dependenciesStreamSplitter = new polymerBuild.HtmlSplitter();

      let buildDirectory = `${buildRoot}/${prefix}`
      console.log(`Deleting ${buildDirectory} directory...`);
      del([buildDirectory])
        .then(() => {

          // sources
          let sourceUntouchables = gulpfilter(['**', '!**/*.min.js', '!**/webcomponentsjs/*', '!**/polymer/*'], {restore: true, passthrough: true});
          let sourcesStream = polymerProject.sources()
            .pipe(sourceUntouchables)
            .pipe(sourcesStreamSplitter.split())

          if (compile) {
            sourcesStream = sourcesStream.pipe(gulpif(/\.js$/, babel({ presets: [babelPresetES2015NoModules] })));
          }

          sourcesStream = sourcesStream
            .pipe(gulpif(/\.js$/, babel({ presets: [babiliPreset] })))
            .pipe(gulpif(/\.css$/, cssSlam({stripWhitespace: true})))
            .pipe(gulpif(/\.html$/, cssSlam({stripWhitespace: true})))
            .pipe(gulpif(/\.html$/, htmlMinifier({collapseWhitespace: true, removeComments: true})))
            .pipe(sourcesStreamSplitter.rejoin())
            .pipe(sourceUntouchables.restore)
            .pipe(gulpif(debug, gulpdebug({title: 'source:'})));

          // dependencies
          let dependenciesUntouchables = gulpfilter(['**', '!**/webcomponentsjs/*', '!**/polymer/*'], {restore: true, passthrough: true});
          let dependenciesStream = polymerProject.dependencies()
            .pipe(dependenciesUntouchables)
            .pipe(dependenciesStreamSplitter.split())

          if (compile) {
            dependenciesStream = dependenciesStream.pipe(gulpif(/\.js$/, babel({ presets: [babelPresetES2015NoModules] })));
          }

          dependenciesStream = dependenciesStream
            .pipe(gulpif(/\.js$/, babel({ presets: [babiliPreset] })))
            .pipe(gulpif(/\.css$/, cssSlam({stripWhitespace: true})))
            .pipe(gulpif(/\.html$/, cssSlam({stripWhitespace: true})))
            .pipe(gulpif(/\.html$/, htmlMinifier({collapseWhitespace: true, removeComments: true})))
            .pipe(dependenciesStreamSplitter.rejoin())
            .pipe(dependenciesUntouchables.restore)
            .pipe(gulpif(debug, gulpdebug({title: 'dependency:'})));


          let buildStream = mergeStream(sourcesStream, dependenciesStream)
            .once('data', () => {
              console.log(`Creating ${prefix} build files...`);
            });

          buildStream = buildStream.pipe(polymerProject.bundler());

          buildStream = buildStream.pipe(gulp.dest(buildDirectory));

          // waitFor the buildStream to complete
          return waitFor(buildStream);
        })
        .catch(reason => console.log('failed:', reason));
    });
  }
}

gulpHelp.task('clean', 'clean build directory', () => del([buildRoot]));
gulpHelp.task('build-es5', 'build in es5-compiled mode', build('es5', true));
gulpHelp.task('build-es6', 'build in es6 mode', build('es6', false));

gulpHelp.task('build', 'build files in dist folder', ['build-es5', 'build-es6']);
// Default Task
gulpHelp.task('default', ['help']);
