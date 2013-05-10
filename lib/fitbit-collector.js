var zoeMongo = require('zoe-mongo'),
    Promise = require('mongoose').Promise;

exports = module.exports = function(personDocument,
									fitbit,
									mongoose) {

	var dataSource = new zoeMongo.DataSource.getSyncModel(mongoose);

    this.syncBodyWeight = function(startDate, endDate) {

        return fitbit.getBodyWeight(startDate, endDate, undefined)
            .then(function(data) {
                var promise = new Promise();
                var BodyWeightModel = zoeMongo.BodyWeight.getModel(mongoose);
                var weights = JSON.parse(data).weight;
                var fulfilledPromises = 0;
                var rejectedPromises = 0;
                var promiseErrors = [];

                function onFulfilled() {
                    console.log("onFulfilled()");
                    fulfilledPromises++;
                    onComplete();
                }

                function onRejected(error) {
                    rejectedPromises++;
                    promiseErrors.push(error);
                    onComplete();
                }

                function onComplete() {
                    console.log("Fulfilled Promises: " + fulfilledPromises);
                    console.log("Rejected promises: " + rejectedPromises);
                    if ((fulfilledPromises + rejectedPromises) === weights.length) {
                        var errors = promiseErrors.join(', ');
                        console.log("Complete: " + errors);
                        promise.resolve(errors.length ? errors : null);
                    }
                }

                for (var i = 0; i < weights.length; i++) {
                    var date = weights[i].date + ' ' + weights[i].time;
                    console.log('Adding weight: ' + weights[i].weight + ' date: ' + date);
                    BodyWeightModel.add(personDocument._id, weights[i].weight, date)
                        .then(onFulfilled, onRejected);
                }
                console.log("returning promise now");
                return promise;
            });

    };

};


exports.dataSourceName = 'fitbit';