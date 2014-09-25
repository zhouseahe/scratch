var fetch = require('../lib/fetch-question.js');
var argv = require('yargs').argv;
var fs = require('fs');
var debug = require('debug')('fetch');
var ytklogin = require('../lib/logon-cookie.js');


var oDir = argv.output;
var options = {
    oDir: oDir
}

fs.readFile(sFile, function(err, data) {
    if (err) {
        console.log(err);
        throw err;
    }
    var source = JSON.parse(data, 'utf8');
    fetch.fetchQuestions(source, options,function(){
        debug('pull finished');
    });
});