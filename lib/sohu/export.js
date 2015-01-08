var excelbuilder = require('msexcel-builder');

var service = {
    export : function(body,dir, cb){
        // Create a new workbook file in current working-path
        var workbook = excelbuilder.createWorkbook('./xlsx', dir+ '_universe.xlsx');
        // Create a new worksheet with 10 columns and 12 rows
        var sheet = workbook.createSheet('sheet1', 10, body.length*40 + 1000);
        //writeRow(sheet,1,header); // 第一行表头
        var rowNumber =1 ;
        var item ;
        for(var i = 0 ; i < body.length; i++) {
            item = body[i];
            if(item){
                rowNumber = writeRow(sheet, rowNumber, item);
            }else{
                console.log(item)
            }
        }
        workbook.save(function(err){
            if (err){
                workbook.cancel();
                cb(err);
            }
            else{
                console.log('excel sucess')
                cb(null);
            }
        });
    }
};

function writeRow(sheet, rowNumber , item){
    for (var i = 0; i < item.universes.length; i++){
        console.log(item.param.type +' , '+ item.param.subject +' , ' + item.param.name +' , ' + item.universes[i])
        sheet.set(1, rowNumber, item.param.type);
        sheet.set(2, rowNumber, item.param.subject);
        sheet.set(3, rowNumber, item.param.name);
        sheet.set(4, rowNumber, item.universes[i]);
        rowNumber++;
    }
    return rowNumber;
}

module.exports = service;
