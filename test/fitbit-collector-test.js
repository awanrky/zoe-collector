describe('fitbit', function () {
	var FitbitCollector = require('../lib/fitbit-collector'),
		Fitbit = require('fitbit-node').Fitbit,
		ZoeMongo = require('zoe-mongo'),
		expect = require('chai').expect,
		mongoose = require('mongoose'),
		fitbitSettings = require('../fitbit-private').settings,
		databaseSettings = require('./test-database-configuration');

	var connectionString = 'mongodb://' + databaseSettings.databaseServer + ':' + databaseSettings.databasePort + '/' + databaseSettings.databaseName;

	var fitbitNode = new Fitbit(fitbitSettings, fitbitSettings.awanrky);
	var person;
	var PersonModel = ZoeMongo.Person.getModel(mongoose);
    var fitbitCollector;


    before(function(done) {
		mongoose.connect(connectionString);
		PersonModel.find({}).remove();

		PersonModel.ensureIndexes(function(error) {
			if (error) { console.log(error.message); }
		});

		person = new PersonModel({
			name: {
				first: 'Fitbit',
				middle: 'Collector',
				last: 'Test'
			},
			active: true,
			createdOn: new Date()
		});

		person.save(function(error) {
			expect(error).to.be.null;
            fitbitCollector = new FitbitCollector(person, fitbitNode, mongoose);
			mongoose.disconnect(function() {
				done();
			});
		});
	});

	afterEach(function(done) {
		mongoose.disconnect(function(){done();});
	});

	beforeEach(function() {
		mongoose.connect(connectionString);
	});

	it('should have a fitbit-node Fitbit object', function() {
		expect(fitbitNode).to.be.an('object');
	});

	it('should have a person document', function() {
		expect(person).to.be.an('object');
	});

	it('should have a fitbit-collector object', function() {
//		var fitbitCollector = new FitbitCollector(person, fitbitNode, mongoose);
		expect(fitbitCollector).to.be.an('object');
	});

    describe('collect body weight', function() {
        var startDate = new Date('2013-02-01');
        var endDate = new Date('2013-02-28');
        var returnError;

        before(function(done) {

            fitbitCollector.syncBodyWeight(startDate, endDate)
                .then(function() {
                    done();
                }, function(error) {
                    console.log(error.message);
                    returnError = error;
                    done();
                });
        });

        it('should sync weights for a date range', function() {
            expect(returnError).to.be.undefined;
        });
    });

});