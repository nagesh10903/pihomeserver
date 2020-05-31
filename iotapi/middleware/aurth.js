const jwt = require('njwt');
const aurthService=require('../services/aurthservice');
module.exports = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
    aurthService.checkValidUser(token,req.headers.user,(err,check)=>{
      if(check) next();       
       else res.status(401).json({err:'Invalid user ID'});    
    });    
    } catch {
      res.status(401).json({
        err: new Error('Invalid request!')
      });
    }
  };