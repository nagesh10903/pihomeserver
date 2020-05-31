var userdata= require("../config/user.json");
var AppConfig=require("../config/IConfig.json");
const jwt = require('njwt')

class aurthService{
 userAuthenticate(username,password,callback) {
    var url=AppConfig.AuthenticateUrl;
    var aurth=AppConfig.Authenticate;
    //console.log(aurth,username,password);
    var usr= userdata.filter(u=>u.username===username && u.password===password);
   // console.log(aurth,usr)
    if(aurth=="LOCAL") {   
     if(usr){
        var token=this.generateToken(usr[0].username,usr[0].role);      
        usr[0].token=token; // AppConfig.AuthToken;
     } 
     else {
      usr[0]={token:null};
     }   
    }
    else {           
     usr[0]={token:null};
    }
    callback(null,usr[0]);
  }

  generateToken(username,role){
    var claims={username:username,role:role};
    const token = jwt.create(claims, AppConfig.AuthToken);
    return token.compact();
   }

   verifyToken(username,role,token,cb){
     jwt.verify(token, AppConfig.AuthToken,(err,vjwt)=>{
      var body=JSON.parse(JSON.stringify(vjwt.body));
        if(body.username===username && body.role===role) 
            return cb(null,body);
        else return cb(null,null);
    });
   }

   checkValidUser(token,username,cb){
     return jwt.verify(token, AppConfig.AuthToken,(err,vjwt)=>{     
      if(err){ return cb(null,false);}
      else {    
        var body=JSON.parse(JSON.stringify(vjwt.body));
       // console.log(body.username,username);
        if(body.username===username)  return cb(null,true);
      }
    }); 
   }

   checkValidUserApi(token,cb){
    return jwt.verify(token, AppConfig.AuthToken,(err,vjwt)=>{     
     if(err){ return cb(null,false);}
     else {    
       var body=JSON.parse(JSON.stringify(vjwt.body));
      // console.log(body.username,username);
       if(body.username===username)  return cb(null,true);
     }
   }); 
  }

}
module.exports=new aurthService;