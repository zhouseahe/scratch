var parse = require('../lib/parse-subject.js');
var argv = require('yargs').argv;
var fs = require('fs');
var debug = require('debug')('parse');
debug = console.log.bind(console);

var uris = [];
uris.push('http://www.yitiku.cn/tiku/yuwen');
uris.push('http://www.yitiku.cn/tiku/shuxue');
uris.push('http://www.yitiku.cn/tiku/yingyu');


var form = '';

for(var i = 0; i < uris.length; i ++){
    parse(uris[i],form,function(){
        console.log('finish');
    });
}
