var request = require('request');
var fs = require('fs');
var path = require('path');
var async = require('async');
var j = request.jar();

var settings = require('../settings');
var host = settings.host;
var subject = 'yuwen';
var cookies = null;

var fetch = {
    fetchQuestions: function(sources, option, cb) {
        cookies = option.cookies;
        var tasks = [];
        for (var i = 0; i < sources.length; i++) {
            var uri = sources[i];
            tasks.push(fetchQuestion(uri, function(err, body, filename) {
                fs.writeFile(path.join(option.oDir, filename), body, function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("保存已完成： " + filename);
                    }
                });
            }));
        }
        async.series(tasks);
        cb();
    }
}

function getCookieValue(key) {
    var cookie = cookies[key];
    if (cookie === null) {
        return null;
    }
    return cookie;
}

function fetchQuestion(uri, cb) {
    var url = host + uri;
    var cookieValue = getCookieValue(subject);
    if (cookieValue === null) {
        console.log('无对应cookie ');
        return;
    }
    var cookie = request.cookie(cookieValue.split(';')[0]);
    j.setCookieSync(cookie, uri);
    var filename =uri.replace(/\//g, '_');
    request({
        url: url,
        jar: j
    }, function(err, resp, body) {
        if (err) {
            cb(err);
            return;
        }
        cb(null, body, filename);
    });
}

module.exports = fetch;