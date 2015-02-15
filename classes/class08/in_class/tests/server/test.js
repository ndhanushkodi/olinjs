
// Setup our assertion library
var expect = require('chai').expect;

var index = require('../../routes/index');


// Sample tests
describe("A test suite", function() {
	// Syncronous
	it('should use expect syntax', function() { 
		expect(true).to.be.true; 
	});
	this.timeout(5000);
	// Async
	it('should work asyncronously', function(done) {
		setTimeout(function() {
			expect(true).to.be.true;
			done();
		}, 1000);
	});
});

// describe("index", function() {
// 	it('should have an attribute ten equal to 10', function() {
// 		expect(index.ten).to.equal(10);
// 	});
// });

//each route has a test suite, each function has an it
//tell mocha which file to run to test specific route. 