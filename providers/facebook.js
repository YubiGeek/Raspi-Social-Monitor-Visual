var FB = require('fb');
var Q = require('q');
var config = require('../config');

FB.options({
    version: 'v2.9'
});

exports.get = function(callback) {
    var deferred = Q.defer();

    FB.api('me', { fields: ['id', 'name', 'fan_count'], access_token: config.facebook.access_token }, function (result) {
        if(result && result.fan_count) {
            deferred.resolve(result.fan_count);
        } else {
            deferred.reject(result);
        }
    });

    deferred.promise.nodeify(callback);
    return deferred.promise;
};