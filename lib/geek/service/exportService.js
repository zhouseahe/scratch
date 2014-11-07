var excelbuilder = require('msexcel-builder');

var service = {
    export : function(header ,body,cb){
        // Create a new workbook file in current working-path
        var workbook = excelbuilder.createWorkbook('/', 'geek.xlsx');
        // Create a new worksheet with 10 columns and 12 rows
        var sheet = workbook.createSheet('sheet1', 10, body.length + 2);
        writeRow(sheet,1,header); // 第一行表头
        for(var i = 0 ; i < body.length; i++) {
            writeRow(sheet, i + 2, body[i]);
        }
        workbook.save(function(err){
            if (err){
                workbook.cancel();
                cb(err);
            }
            else{
                cb(null);
            }
        });
    }
};

function writeRow(sheet, row , arr){
    for (var i = 0; i < arr.length; i++){
        sheet.set(i+1, row, arr[i]);
    }
}

module.exports = service;
