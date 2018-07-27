/**
 * @description
 * This will load and test negative testcases
 */
describe('Todo negative test', function() {
  const todoUtil = require('./../../utils/todoUtil.js');

  let todoTextBox = element(by.id('todotask'));
  let addNewButton = element(by.id('addtodotask'));
  let removeTaskButton = element(by.css('button'));

  // All the list item
  let todoList = element.all(by.repeater('x in todoList'));

  beforeEach(function() {
    //todoUtil.slowTheTest(10);
  });

  afterEach(function() {
    // Note: this is using Jasmine 2 reporter syntax.
    jasmine.getEnv().addReporter(new function() {
      this.specDone = function(result) {
        // if testcase fails
        if (result.failedExpectations.length > 0) {
          // take screenshot after failure
          todoUtil.takeScreenshotWithProtractor(result);
        }
      }
    });
  });
  it('Page should load properly', function() {
    // Load demo angular site
    browser.get('http://mahmudulhasan.github.io/ToDoAngular/');

    // Check that todo textbox and Add New button is present
    expect(element(by.id('todotask')).isPresent()).toBe(true);
    expect(element(by.id('addtodotask')).isPresent()).toBe(true);
  });
  it('Should not add a todo task in the todo list if text box is empty.', function() {
    let numOfListItem = null;
    // Count list item then add another todo task
    todoList.count().then(function(result) {
      numOfListItem = result;
      // Add another todo task
      todoTextBox.clear();
      addNewButton.click();
      expect(todoList.count()).not.toEqual(numOfListItem + 1);
    });
  });
});
