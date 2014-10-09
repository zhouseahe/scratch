var cheerio = require("cheerio");
var fs = require('fs');
var path = require('path');
var async = require('async');
var debug = require('debug')('parse');
var map ;

module.exports = function parseQuestion(sDir , subjects , cb){
    fs.readdir(sDir, function(err, files) {
        if(err){
            debug('读取输入目录错误');
            return ;
        }
        map = convertJson(subjects);
        async.mapLimit(files,1,function(html,callback){
            fs.readFile(path.join(sDir ,html),function(err,data){
                if(err){
                    debug(err);
                }
                html2Json(sDir,html,data,map,callback);
            });
        },function(err, results){
            if(err){
                cb(err,null);
                return ;
            }
            cb(null,results);
        });
    });
}

function html2Json(sDir,html,data,map,callback){
    $ = cheerio.load(data.toString());
    var position = $('div .path').text();
    var subject = position.split('>')[1].trim();
    var pointObj = $('.fl a','ul');
    var points = [];
    var pointUris = [];
    for(var i = 0 ; i < pointObj.length ; i++){
        var uri = pointObj[i].attribs['href'] ;
        var classify = queryClassify(subject,uri);
        pointUris.push(uri);
        points.push(classify);
    }
    var question = {
        subject:subject,
        uri:'/' + html.replace('_','/'),
        pointUris :pointUris,
        points :points,
        filepath : path.join(sDir ,html)
    }
    callback(null, question);
}

function queryClassify(subject,uri){
    var points = [];
    var domain = map[subject];
    uri = uri.replace(/\//g,'');
    var ids = uri.split('point')[1].split('-');
    var seed = domain ;
    for(var i = 0 ; i < ids.length ; i++){
        seed = seed[ids[i]];
        points.push(seed.name);
        seed = seed.id;
    }
    return points;
}


function convertJson(subs){
    var map = {};
    for(var i = 0 ; i < subs.length ; i++){
        var sub = subs[i];
        map[sub.name] = convertChildren(sub.children);
    }
    return map;
}

function convertChildren(children){
    var result = {};
    for(var i = 0 ; i< children.length; i++){
        result[children[i].id] = { name:children[i].name }
        if(children[i].children){
            var child = convertChildren(children[i].children);
            result[children[i].id].id = child;
        }
    }
    return result;
}