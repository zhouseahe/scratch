var parse = require('../lib/parse-subject.js');
var argv = require('yargs').argv;
var fs = require('fs');
var debug = require('debug')('parse');
debug = console.log.bind(console);

var output = argv.output;
var uri =  'http://www.yitiku.cn/tiku/yuwen/';
var form = '';

parse(uri,form,output,function(){
    console.log('finish');
});