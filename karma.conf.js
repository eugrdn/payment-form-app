module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'public/libs/bower_components/angular/angular.js',
      'public/libs/bower_components/angular-mocks/angular-mocks.js',
      'public/javascripts/**/*.js',
      'test/**/*.test.js'
    ],
    exclude: [
    ],
    preprocessors: {
    },
    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-spec-reporter'
    ],
    reporters: ['spec'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false, concurrency: Infinity
  })
};
