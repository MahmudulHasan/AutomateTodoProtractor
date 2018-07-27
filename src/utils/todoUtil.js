/**
 * @description
 *	This is the class for all the utils
 */
var TodoUtil = function() {

  const fs = require('fs');
  const path = require('path');

  /**
   * takeScreenshotWithProtractor function helps to take screenshot.
   * @params {string} result: spec description.
   */
  this.takeScreenshotWithProtractor = function(result) {
    browser.takeScreenshot().then(function(png) {
      // If screenshot folder does not exist it will create a screenshot folder.
      let dir = "./screenshot/";
      try {
        fs.mkdirSync(dir);
      } catch (e) {
        if (e.code != 'EEXIST')
          throw e;
      }

      try {
        // Create your image file if not exists. Image file name is test case name.
        let stream = fs.createWriteStream(path.join(dir, result.description + '.png'));
        stream.write(new Buffer(png, 'base64'));
        stream.end();
      } catch (e) {
        if (e.code != 'EEXIST')
          throw e;
      }
    });
  }
  /**
   * slowTheTest function helps to slow the testcases
   * @params {int} time: testcase time.
   */
  this.slowTheTest = function(time) {
    var origFn = browser.driver.controlFlow().execute;
    browser.driver.controlFlow().execute = function() {
      var args = arguments;
      // queue 100ms wait
      origFn.call(browser.driver.controlFlow(), function() {
        return protractor.promise.delayed(time); // here we can adjust the execution speed
      });
      return origFn.apply(browser.driver.controlFlow(), args);
    };
  }
};

module.exports = new TodoUtil();
