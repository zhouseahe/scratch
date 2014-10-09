var fs = require('fs');
var path = require('path');
var async = require('async');
var mkdirp = require('mkdirp');
var async = require('async');
var paths = [];
var copyPaths = [];
var count = 1 ;

module.exports = function classify(jsons, subjects , odir ,callback){
    genPaths(subjects , '/test');
    async.each(paths ,function( fp ,cb){
        mkdirp(fp, function (err) {
            if (err) console.error('err');
            else {
                if(count%10 ==0 ){
                    console.log('pow !' + count++);
                }
            }
        });
    }, function(err){
        if( err ) {
            return callback(err);
        }
        console.log('finished  !' + count);
        count = 1 ;
        for(var i = 0 ; i < jsons.length ; i< i++){
            var item = jsons[i];
            var writePath = path.join(odir,item.subject);
            for(var key in item.points[0]){
                writePath = path.join(writePath,item.points[0][key]);
            }
            var filename = item.uri.substr(1).replace(/\//g, '_');
            var fps = item.filepath +"@@" + path.join(writePath,filename);
            copyPaths.push(fps);
            async.eachLimit(copyPaths,2,function(fp){
                var p = fs.split('@@');
                var rs = fs.createReadStream(p[0]).pipe(fs.createWriteStream(p[1]));
                rs.on('end',function(){
                    if(count%10 ==0 ){
                        console.log('curr  : ' + count ++);
                    }
                })
            },function(err){
                if( err ) {
                    return callback(err);
                }
                console.log('finished : ' + count );
                console.log(' all finished ...');
            })
        }
    });
}


function genPaths(subs,fp){
    var map = {};
    for(var i = 0 ; i < subs.length ; i++){
        var sub = subs[i];
        map[sub.name] = convertChildren(fp,sub,sub.name);
    }
}

function convertChildren(fp ,sub, name){
    if(sub.children){
        fp = path.join(fp,name);
        for(var i = 0 ; i< sub.children.length; i++){
            var curr = sub.children[i];
            convertChildren(fp,curr,curr.name);
        }
    }else{
        fp = path.join(fp,name);
        paths.push(fp);
    }
}