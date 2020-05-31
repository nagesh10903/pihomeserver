
var userService=require('../services/userService');
var logaction =require('../services/activitylog');
var aurthService=require('../services/aurthservice');

class usercontroler{

  getUsers(req, res){
    logaction.logActivity(req,"List Users:");
      userService.getUsers((err,userdata)=>{
      res.json({users:userdata});
   });
  }

  getById(req, res) {
      var id=req.params.id;
      userService.getById(id,(err,userdata)=>{
        res.json({users:userdata});
      });
  }

  getByName(req, res) {
     var name=req.params.name;
     userService.getByName(name,(err,userdata)=>{
       res.json({users:userdata});
    });
  }
 
 addUser(req, res){    
   var newuser=req.body;
   logaction.logActivity(req,"Add user:"+JSON.stringify(req.body));
   userService.addUser(newuser,(err,userdata)=>{
     if(!userdata)userdata=null;
       res.json({users:userdata});
    });
 }
 
 updateUser(req, res){
     var newuser=req.body;
     logaction.logActivity(req,"Update user:"+JSON.stringify(req.body));
     userService.updateUser(newuser,(err,userdata)=>{
       if(!userdata)userdata=null;
         res.json({users:userdata});
      });
 }
 deleteUser(req, res){
    var delusername=req.params.username;
    logaction.logActivity(req,"delete user:"+delusername);
    userService.deleteUser(delusername,(err,userdata)=>{
       if(!userdata)userdata=null;
        res.json(userdata);
     });
 }
 userAuthenticate(req,res){
   aurthService.userAuthenticate(req.body.username,req.body.password,(err,user)=>{
      if(!err){
        logaction.logActivity(req," Authenticated user: "+req.body.username);
        res.json(user);
      }
      else  res.json({err:"invalid user!",user:null});
   });
 }

 getToken(req, res){
   var username=req.body.username;
   var password=req.body.password;
   logaction.logActivity(req,"Token Request user :"+username);
   userService.getByName(username,(err,userdata)=>{
   // console.log(userdata,err);
    if(!err || userdata!==null){
      if(userdata.password===password){
       var token= aurthService.generateToken(username,userdata.role);
     //  console.log(token);
        res.json({JwtToken:token});
      }
      else
      { 
        res.json({err:"invalid user/password",JwtToken:null});
      }
    }
    else{
      res.json({err:"invalid user!",JwtToken:null});
    }   
   });
  }
}
module.exports=new usercontroler;