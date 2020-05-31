
var devices=require("../config/devices.json");
var piconfig=require("../config/deviceconfig.json");
var users=require("../config/user.json");
var exec=require("child_process").exec;
var superagent=require('superagent')

class actions{


doAction(proom,pdev,poption,callback)
{
    var user=users.filter(u=>u.type==="ADMIN");
    var device=devices.filter(d=>d.route.toUpperCase()===proom+"/"+pdev)[0];
 // console.log(poption);
   var action= this.getaction(device,poption);

   if(action===null){
       return {status:-1}
   }
   else
   {
   // console.log(action);

       switch(action.type.toUpperCase())
       { 
           case "CONTROLER": 
           console.log(action.type);
                       this.docontroler(action,(err,val)=>{
                       // console.log("3.1",val); 
                        return callback(null, {status:val});  
                       });                       
           break;
 
           case "IRREMOTE": 
            if(poption!==""){
                this.doir({remote:pdev,action:poption},(err,result)=>{
                    console.log(result);
                    return callback(null,result);
                });
            }
            else {
                this.getRemoteCommands(pdev,(err,result)=>{
                    console.log(result);
                    return callback(null,{status:1,mode:"IRREMOTE",ircommands:result});
                });
            }  
           break;

           case "IPCAMERA": 
           return callback(null, {status:1,mode:"IPCAMERA",url:action});  
           break;

           case "SENSOR": 
           return callback(null, {status:1,mode:"Not Implemented",action:action});  
           break;

           default:
            return callback(null, {status:1,mode:"Not Implemented",action:action});  
       }
   }
 
}

getAllActions(callback)
{
 var result=[];
 var options=["ON","OFF","TGL","UP","DN","VAL"];
 var user=users.filter(u=>u.type==="ADMIN")[0];
 //console.log("allocation");
 devices.forEach(device => {
      var conf=piconfig.filter(pi=>pi.room===device.room)[0];
      var actions=[];
      if(device.mode.toUpperCase()==="CONTROLER"){
        options.forEach(op => {
            var action= this.getaction(device,op);
            actions.push(action);
        });
       }
       else{
             var action= this.getaction(device,"");
            actions.push(action);
       }
     result.push({device,action:actions});
    });
    callback(null,{user:user,devices:result});
 }

 getaction(device,poption)
 {
  var action={};
  //console.log("action...");
  try {  
     switch(device.mode.toUpperCase()){
     case "CONTROLER": 
         poption=(poption==="")?"TGL":poption;

         var conf=piconfig.filter(pi=>pi.room===device.room)[0];
         if(conf){
         var wifi=(device.interface.includes("WIFI") && conf.WIFI.hasOwnProperty(poption))?{"route":conf.WIFI.route,action:conf.WIFI[poption].replace("{n}",device.label.WIFI)}:{};
         var IR=(device.interface.includes("IR")  && conf.IR.hasOwnProperty(poption))?{"remote":conf.IR.remote,action:conf.IR[poption].replace("{n}",device.label.IR)}:{};
         var BLE=(device.interface.includes("BLE")  && conf.BLE.hasOwnProperty(poption))?{"name":conf.BLE.name,action:conf.BLE[poption].replace("{n}",device.label.BLE)}:{};
         action={type:device.mode,command:poption,IR:IR,WIFI:wifi,BLE:BLE};
         }
         break;
     case "IRREMOTE":
        action={type:device.mode,command:poption,remote:device.label.IR};
        break;  

     case "IPCAMERA":
        action={type:device.mode,command:poption,remote:device.label.WIFI}; // IP:port of camera in home intranet
        break;  
     case "SENSOR":
        action={type:device.mode,command:poption,remote:device.label};
        break; 
     default:
        action={type:device.mode,remote:device.label};
     }
    }
  catch(err){
      console.log("getAction Err: ",err);
  return null;
  }  
  return action;
  }
 


docontroler(action,callback) // Action type=CONTROLER
{
    console.log("docont...");
 if(action.WIFI!=={}){
   this.dowifi(action.WIFI,(err,result)=>{
       console.log(result);
       return callback(null,result);
   }); 
 }
 else  if(action.BLE!=={}){
    this.doble(action.BLE,(err,result)=>{
        console.log(result);
        return callback(null,result);
    });
}
else  if(action.IR!=={}){
    this.doir(action.IR,(err,result)=>{
        console.log(result);
        return callback(null,result);
    });
}
}
  
doir(command,callback){
    console.log("do ir...");
    this.sendOnce(command.remote,command.action,(err,stdout,stderr)=>{
        if(err){
            console.log(err);
            return callback(null, {status:"NOTOK",err:err,Mode:"IR"});
        }
        else  return callback(null, {status:"OK",stdout:stdout,Mode:"IR"});
    })

//return {status:"OK",method:"IR"};
}
  
dowifi(command,callback){
    
    superagent.get("http://"+command.route+command.action,{timeout: 500}).then(resp=>{
  //  var req=  http.request("http://"+command.route+command.action,{timeout: 500},(res)=>{
     //   console.log("do..wifi..1.");         
        return callback(null,  {status:"OK",Mode:"WIFI"});             
    }).catch(err=>{
        return callback(null,  {status:"NOTOK",Mode:"WIFI",err:err});
     });
}

doble(callback){

    return callback(null, {status:"OK",Mode:"BLE"});
}
    
  
// ir Lirc Functions for IR Tranmsitter

sendOnce(remote, code, callback) {
	if (!remote) remote = '';
	if (!code) code = '';

    //var command =  this.command + ' SEND_ONCE "' + remote + '" "' + code + '"';
    var command = 'irsend SEND_ONCE "' + remote + '" "' + code + '"';

	 exec(command, (err,sout,serr)=>{
        if(err || sout.length<=0){ callback(err,null);}
        else{
           var val=sout.split('\n').filter(r=>r!='') ;
           return  callback(null,val);        }
     });
}

getRemotes(callback){
    var cmd="irsend LIST '' '' "; 
    //console.log("remotes .....");
    exec(cmd, (err,sout,serr)=>{
        if(err || sout.length<=0){ callback(err,null);}
        else{
           var val=sout.split('\n').filter(r=>r!='') ;
          // console.log(val);
            callback(null,val);         }
    });
}

getRemoteCommands(remote,callback){
   // console.log("rem   ..",remote);
    var cmd="irsend LIST '"+remote+"' '' ";
    exec(cmd, (err,sout,serr)=>{
       
        if(err || sout.length<=0){  callback(err,null);}
        else{
           var val=sout.split('\n').filter(r=>r!='').map(c=>c.split(' ')[1]) ;          
           callback(null,{remote:remote,commands:val});       
         }
    });
}
getAllCommands(){
    var cmd="irsend LIST '' '' ";
}



}
module.exports=new actions;