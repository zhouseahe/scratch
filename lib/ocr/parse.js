var request = require('request');
var tesseract = require('node-tesseract');

tesseract.process(__dirname + '\\test.png',function(err, text) {
    if(err) {
        console.error(err);
    } else {
        console.log(text);
    }
});

function parseImage(){


}

function sendRequest(){
	request({
        method: 'post',
        url: logUri,
        form: form
    }, function(err, resp, body) {
        if (err) {
            console.log(err);
            return;
        }
        var cookie = {'yuwen':resp.headers['set-cookie'][0]};
        fs.writeFile('../config/cookie.json',JSON.stringify(cookie),function(err){
            if (err) {
                console.log(err);
                return ;
            } else {
                console.log("保存已完成");
            }
        });
    });
}

