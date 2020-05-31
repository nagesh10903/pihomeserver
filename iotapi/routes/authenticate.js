var express = require('express');
var router = express.Router();
var userControler=require('../controler/usercontroler');

router.get('/login/:name', userControler.getByName);
router.post('/token', userControler.getToken);
router.post('/authenticate',userControler.userAuthenticate);
 
module.exports = router;