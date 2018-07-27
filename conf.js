const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
const HtmlReporter = require('protractor-beautiful-reporter');


exports.config = {
  //specs: ['./src/specs/positive/todoTest_spec.js', './src/specs/negative/todoNegativeTest_spec.js'],
  suites: {
    positive: './src/specs/positive/todoTest_spec.js',
    negative: './src/specs/negative/todoNegativeTest_spec.js'
  },
  capabilities: {
    browserName: 'chrome'
  },
  onPrepare: function() {
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: false
      }
    }));
    jasmine.getEnv().addReporter(new HtmlReporter({
         baseDirectory: './screenshots'
      }).getJasmine2Reporter());
  },
  jasmineNodeOpts: {
    defaultTimeoutInterval: 100000
  }
};
