var request = require('request');
var fs = require('fs');
var path = require('path');
var async = require('async');

var j = request.jar();

var settings = require('../settings');
var cookies = settings.cookies;
var host = settings.host;

var fetch = {
    fetchQuestions: function(sources, options, cb) {
        var tasks = [];
        for (var i = 0; i < sources.length; i++) {
            var question = sources[i];
            tasks.push(fetchQuestion(question, function(err, body, filename) {
                fs.writeFile(path.join(options.oDir, filename), body, function(err) {
                    if (err) {
                        debug(err);
                    } else {
                        debug("保存已完成： " + filename);
                    }
                });
            }));
        }
        async.series(tasks);
        cb();
    }
}

function getCookieValue(question) {
    var cookie = cookies[question.subject];
    if (cookie === null) {
        debug('对 ' + question.subject + ' 获取cookie 失败 ');
        return null;
    }
    return cookie;
}

function fetchQuestion(question, cb) {
    var uri = host + question.path;
    var cookieValue = getCookieValue(question);
    if (cookieValue === null) {
        debug('请求忽略 ');
        return;
    }
    var cookie = request.cookie(cookieValue);
    j.setCookie(cookie, uri);
    var filename = question.path.substr(1).replace(/\//g, '_');
    request({
        url: uri,
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