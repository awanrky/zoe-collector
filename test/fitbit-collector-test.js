describe('fitbit', function () {
	var FitbitCollector = require('../lib/fitbit-collector'),
		Fitbit = require('fitbit-node').Fitbit,
		ZoeMongo = require('zoe-mongo'),
		expect = require('chai').expect,
		fitbitSettings = require('../fitbit-private').settings,
		databaseSettings = require('./test-database-configuration');

//	var
//		mongo = new ZoeMongo.Mongo(
//		databaseSettings.databaseServer,
//		databaseSettings.databasePort,
//		databaseSettings.databaseName
//	);
	var fitbitNode = new Fitbit(fitbitSettings);
//	var dataSourceSync = new ZoeMongo.DataSource.Sync(mongo, FitbitCollector.dataSourceName);
//	var fitbitCollector = new FitbitCollector(fitbitNode, dataSourceSync);

//	it('should have a mongo object', function() {
//		expect(mongo).to.be.an('object');
//	});

	it('should have a fitbit-node Fitbit object', function() {
		expect(fitbitNode).to.be.an('object');
	});

//	it('should have a DataSource Sync object', function() {
//		expect(dataSourceSync).to.be.an('object');
//	});



});