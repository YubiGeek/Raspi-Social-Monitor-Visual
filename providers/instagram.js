var Instagram = require('instagram-node');
var Q = require('q');
var config = require('../config');

var ig = new Instagram.instagram();

ig.use({
    access_token: config.instagram.access_token
});

exports.get = function(callback) {
    var deferred = Q.defer();

    ig.user('3056311477', function(error, result, remaining, limit) {
        if(!error && result && result.counts) {
            deferred.resolve(result.counts.followed_by);
        } else {
            deferred.reject(error);
        }
    });

    deferred.promise.nodeify(callback);
    return deferred.promise;
};