var path = require("path");  
var fs = require('fs');
var today = new Date();
var month_stamp=today.getFullYear() +'_'+today.getMonth()
var activityLogpath = path.resolve(__dirname + '/../logs/activity/activity'+month_stamp+'.log');
var actionLogpath = path.resolve(__dirname + '/../logs/activity/action'+month_stamp+'.log');
var _res;
class activitylog {

    logAction(data)
    {
        var dtstamp=new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        var logdata=dtstamp +'  '+data;
        fs.appendFile(actionLogpath,logdata +"\n",'utf8',(err)=>{
             if(err) console.log(err);
         });
    }
    logActivity(data)
    {
     var dtstamp=new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
     var logdata=dtstamp +'  '+data;
     fs.appendFile(activityLogpath,logdata +"\n",'utf8',(err)=>{
          if(err) console.log(err);
      });
    }
    logActivity(req,data) 
    { 
     //   console.log(req);
      var user=(req.headers && req.headers.user)?req.headers.user:(req.body && req.body.username)?req.body.username:'Guest';
      var dt=new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
      var logdata=dt +'  '+user+' '+data;
     fs.appendFile(activityLogpath,logdata +"\n",'utf8',(err)=>{
          if(err) console.log(err);
      });       }
}
module.exports=new activitylog;