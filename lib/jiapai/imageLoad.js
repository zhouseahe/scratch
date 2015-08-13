var fs = require('fs');
var request = require('request');
var imageService = {};

imageService.loadImage = function(url,dir) {
    request.head(url, function(err, res, body) {
        if(err){
            console.log(err);
            return ;
        }
        console.log(url);
        request(url).pipe(fs.createWriteStream(dir + cutFilename(url)));
    });
};

function cutFilename(url){
    var start = url.lastIndexOf('/');
    return url.substring(start+1);
}

module.exports= imageService;

