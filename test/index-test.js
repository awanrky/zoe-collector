var expect = require('chai').expect,
	index = require('../lib/index'),
	fitbitSettings = require('../fitbit-private').settings;

describe('index', function () {
	"use strict";

	it('should have an index object', function() {
		expect(index).to.be.an('object');
	});

	it('should provide a fitbit-node constructor', function() {
		expect(index.Fitbit).to.be.a('function');
	});

	it('should create a fitbit-node object', function() {
		var fitbit = new index.Fitbit(fitbitSettings);
		expect(fitbit).to.be.an('object');
	});

	it('should provide a zoe-mongo DataSource object', function() {
		expect(index.DataSource).to.be.an('object');
	});

	it('should provide a zoe-mongo DataSource Sync constructor', function() {
		expect(index.DataSource.Sync).to.be.a('function');
	});

	it('should create a zoe-mongo DataSource object', function() {
		var dataSourceSync = new index.DataSource.Sync();
		expect(dataSourceSync).to.be.an('object');
	});
});
