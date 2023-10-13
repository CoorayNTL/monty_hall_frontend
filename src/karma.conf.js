// karma.conf.js
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    files: [
      // Add your test and configuration files here
      { pattern: 'src/**/*.spec.ts', watched: false }
    ],
    preprocessors: {
      'src/**/*.spec.ts': ['@angular-devkit/build-angular']
    },
    mime: {
      'text/x-typescript': ['ts', 'tsx']
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'], // You can add other browsers here
    singleRun: false
  });
};
