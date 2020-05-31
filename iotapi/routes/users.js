var express = require('express');
var router = express.Router();
var userControler=require('../controler/usercontroler');

/* GET users listing. */
router.get('/', userControler.getUsers);
router.get('/:id', userControler.getById);

router.post('/add', userControler.addUser);
router.post('/del/:username', userControler.deleteUser);
router.post('/update/:username', userControler.updateUser);
 
module.exports = router;