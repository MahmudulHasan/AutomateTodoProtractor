describe('Basic protractor test', function() {
	it('Page should load properly', function() {
		// Load demo angular site
		browser.get('http://mahmudulhasan.github.io/ToDoAngular/');

		// Check that todo textbox and Add New button is present
		expect(element(by.id('todotask')).isPresent()).toBe(true);
		expect(element(by.id('addtodotask')).isPresent()).toBe(true);
	});
});