var express = require('express');
var router = express.Router();
var devicecontroler=require("../controler/devicecontroler");

router.get('/remotes', devicecontroler.getRemotes);
router.get('/allremotes',devicecontroler.getRemotes);
router.get('/allactions',devicecontroler.getAllActions);
router.get('/remotes/:remote',devicecontroler.getCommands);
// route= :room/:dev/:option
router.get('/:room/:dev/:option?',devicecontroler.doaction);

module.exports = router;
