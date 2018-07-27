/**
 * @description
 * This will load and test positive testcases
 */
describe('Basic Todo test', function() {
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

  it('Should add a todo task in the todo list', function() {

    let numOfListItem = null;

    // Count list item then add another todo task list item no will increase by 1
    todoList.count().then(function(result) {
      numOfListItem = result;

      // Add another todo task
      todoTextBox.sendKeys("Second todo task");
      addNewButton.click();
      expect(todoList.count()).toEqual(numOfListItem + 1);
    });
  });

  it('Should add multiple todo task in the todo list', function() {

    let numOfListItem = null;

    // Count list item then add some todo task list item
    todoList.count().then(function(result) {
      numOfListItem = result;
      for (let i = 2; i < 6; i++) {
        todoTextBox.sendKeys("Todo task no : ", i + 1);
        addNewButton.click();
      }
      expect(todoList.count()).toEqual(numOfListItem + 4);
    });
  });

  it('Should remove a task from todo list', function() {
    todoList.count().then(function(result) {
      todoList.get(0).element(by.model('x.done')).click();
      removeTaskButton.click();
      expect(todoList.count()).toEqual(result - 1);
    });
  });

  it('Should remove all the task in todo list', function() {
    todoList.count().then(function(result) {
      for (var i = 0; i < result; i++) {
        todoList.get(i).element(by.model('x.done')).click();
      }
      removeTaskButton.click();
      expect(todoList.count()).toEqual(0);
    });
  });
});
