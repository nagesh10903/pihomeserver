
var actions=require("../services/actions");
var logaction =require('../services/activitylog')

class devicecontroler{

doaction(req, res)
{
  var proom=req.params.room.toUpperCase();
  var pdev=req.params.dev.toUpperCase();
  var poption=(req.params.option)?req.params.option.toUpperCase():"";
  logaction.logActivity(req," Action Request "+JSON.stringify(req.params));
  actions.doAction(proom,pdev,poption,(err,result)=>{
    logaction.logActivity(req," Action completed "+JSON.stringify(req.params) + ' '+ JSON.stringify(result));
    res.json(result);  
  });  
}

getAllActions(req,res)
{

 // console.log(" controler devicecont->");
   var action=actions.getAllActions((err,result)=>{    
    return res.json(result);  
  });  
}

getRemotes(req,res)
{
   actions.getRemotes((err,result)=>{
  return res.json(result);  
});  
}

 getCommands(req,res)
{
  actions.getRemoteCommands(req.params.remote,(err,result)=>{
      return res.json(result);  
    });  
}


}
module.exports=new devicecontroler;