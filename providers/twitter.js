var Twitter = require('twitter');
var Q = require('q');
var config = require('../config');

var client = new Twitter({
    consumer_key: config.twitter.consumer_key,
    consumer_secret: config.twitter.consumer_secret,
    access_token_key: config.twitter.access_token_key,
    access_token_secret: config.twitter.access_token_secret
});

exports.get = function(callback) {
    var deferred = Q.defer();

    client.get('account/verify_credentials', {}, function (error, data, response) {
        if(!error && data && data.followers_count) {
            deferred.resolve(data.followers_count);
        } else {
            deferred.reject(error);
        }
    });

    deferred.promise.nodeify(callback);
    return deferred.promise;
};