describe('Basic protractor test', function() {
	var todoTextBox = element(by.id('todotask'));
	var addNewButton = element(by.id('addtodotask'));
	var removeTaskButton = element(by.css('button'));
	var fs = require('fs');
    var path = require('path');

	// All the list item 
	var todoList = element.all(by.repeater('x in todoList'));

	
	afterEach(function() {
		takeScreenshotWithProtractor();
	});
	
	var takeScreenshotWithProtractor = function() {
		// Note: this is using Jasmine 2 reporter syntax.
		jasmine.getEnv().addReporter(new function() {
			this.specDone = function(result) {
				// if testcase fails
				if(result.failedExpectations.length > 0) {
					// take screenshot after failure
					browser.takeScreenshot().then(function(png) {
					 // If screenshot folder does not exist it will create a screenshot folder.         
			          var dir = "./screenshot/";
			          try {
			            fs.mkdirSync(dir);
			          } catch(e) {
			              if ( e.code != 'EEXIST' ) 
			              throw e;
			          }

			          try {
			          	// Create your image file if not exists. Image file name is test case name.
				          var stream = fs.createWriteStream(path.join(dir, result.description + '.png'));
				           stream.write(new Buffer(png, 'base64'));
				           stream.end();
				        } catch(e) {
				          if ( e.code != 'EEXIST' ) 
				                throw e;
				        }

					});
				}
			}
		});
	};

	it('Page should load properly', function() {
		// Load demo angular site
		browser.get('http://mahmudulhasan.github.io/ToDoAngular/');

		// Check that todo textbox and Add New button is present
		expect(element(by.id('todotask')).isPresent()).toBe(true);
		expect(element(by.id('addtodotask')).isPresent()).toBe(true);
	});

	it('Should add a todo task in the todo list', function() {
		
		var numOfListItem = null;

		// Count list item then add another todo task list item no will increase by 1
		todoList.count().then(function(result) {
			console.log(result); 
			numOfListItem = result;

			// Add another todo task
			todoTextBox.sendKeys("Second todo task");
			addNewButton.click();
			expect(todoList.count()).toEqual(numOfListItem+1);
		});
	});

	it('Should remove all the task in todo list', function() {
		todoList.count().then(function(result) {
			for(var i=0;i<result;i++) {
				todoList.get(i).element(by.model('x.done')).click();
			}
			removeTaskButton.click();
			expect(todoList.count()).toEqual(0);
		});
	});

	it('This test case should fail', function() {
		expect(todoList.count()).toEqual(1);
	});
});