var userdata= require("../config/user.json");
var AppConfig=require("../config/IConfig.json");
var path = require("path");  
var fs = require('fs');

var userdatapath = path.resolve(__dirname + '/../config/user.json');
class userService{

 getUsers(callback){
     return callback(null,(userdata));
 }
 getById(id,callback) {
  return callback(null,(userdata.filter(u=>u.id===id)));
 }
 getByName(name,callback) {
     callback(null,(userdata.filter(u=>u.username===name)[0]));
  }
 
 addUser(newuser,callback){
   if(userdata.filter(u=>u.username===newuser.username || u.id===newuser.id)[0]){
    return  callback(null,userdata.filter(u=>u.username===newuser.username || u.id===newuser.id)[0]);
   }
   else {
   var newuser=this.generateUser(newuser);
   userdata.push(newuser); 
    fs.writeFile(userdatapath, JSON.stringify(userdata), err => { 
         if (err) { callback(err,null); }
         else return  callback(null,userdata.filter(u=>u.username===newuser.username)[0]);        
     });
    }
 }

  updateUser(newuser,callback){       
    userdata=this.updateUserData(newuser);
        fs.writeFile(userdatapath, JSON.stringify(userdata), err => { 
            if (err) { callback(err,null); }
            else return callback(null,userdata.filter(u=>u.username===newuser.username)[0]);        
        });
  }
  deleteUser(delusername,callback){

    var deluser=userdata.filter(u=>u.username===delusername)[0];
    userdata=userdata.filter(u=>u.username!==delusername);
    //console.log("Del: ",userdata,delusername,deluser);
        fs.writeFile(userdatapath, JSON.stringify(userdata), err => { 
          if (err) { console.log(err);callback(err,null); }
            else return  callback(null,deluser);        
        });
  }
  // {"id":"","username":"","password":"","role":"","category":""}
updateUserData(newuser){ 
    for (var i = 0; i < userdata.length; ++i){
     if(userdata[i].username===newuser.username){
        for( var key in newuser){
          userdata[i][key]=newuser[key];          
         }
       }
    }
    return userdata;
}
generateUser(rawuser){ 
 // console.log(rawuser,userdatapath);
  var user=rawuser;
  var newid=user.id;
  if(!newid){
  var maxid=Math.max(...userdata.map(u=>Number(u.id)));
  newid=(maxid+1).toString();
  }
  user={id:newid,username:rawuser.username,password:rawuser.password,
         role:rawuser.role,category:rawuser.category};
  return user;
}
 userAuthenticate(username,password,callback) {
    var url=AppConfig.AuthenticateUrl;
    var aurth=AppConfig.Authenticate;
    //console.log(aurth,username,password);
    var usr= userdata.filter(u=>u.username===username && u.password===password);
   // console.log(aurth,usr)
    if(aurth=="LOCAL") {   
    if(usr){
      usr[0].token=AppConfig.AuthToken;
    }
    
    }
    else {
           
     usr[0]={};
    }
    callback(null,usr[0]);
  }

}
module.exports=new userService;