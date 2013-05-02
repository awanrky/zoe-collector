var zoeMongo = require('zoe-mongo');

exports = module.exports = function(personDocument,
									fitbit,
									mongoose) {

	var dataSource = new zoeMongo.DataSource.getSyncModel(mongoose);


};


exports.dataSourceName = 'fitbit';