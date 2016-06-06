describe('Basic protractor test', function() {
	it('Page should load properly', function() {
		// Load demo angular site
		browser.get('http://mahmudulhasan.github.io/ToDoAngular/');

		// Check that todo textbox and Add New button is present
		expect(element(by.id('todotask')).isPresent()).toBe(true);
		expect(element(by.id('addtodotask')).isPresent()).toBe(true);
	});

	it('Should add a todo task in the todo list',function() {
		var todoTextBox = element(by.id('todotask'));
		var addNewButton = element(by.id('addtodotask'));

		// All the list item 
		var todoList = element.all(by.repeater('x in todoList'));
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
});