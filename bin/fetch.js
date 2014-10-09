var fetch = require('../lib/fetch-question.js');
var argv = require('yargs').argv;
var fs = require('fs');

fs.readFile('../config/cookie.json', function(err, data) {
    if (err) {
        console.log(err);
        throw err;
    }
    var cookie = JSON.parse(data, 'utf8');
    var option = {
        oDir: '/yitk',
        cookies :cookie
    }
    //var  sources  = ['/shiti/829252.html','/shiti/829215.html','/shiti/829143.html'];
    var  sources  = ['/shiti/829252.html'];
    fetch.fetchQuestions(sources ,option,function(){
        console.log('pull finished');
    });
});