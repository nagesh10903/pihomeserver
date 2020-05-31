var express = require('express');
var router = express.Router();
var devices=require("../config/devices.json")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({devices:devices});
});

router.get('/:id', function(req, res, next) {
  var id=req.params.id;
  res.json({devices:devices.filter(d =>d.deviceid===id)});
});

router.get('/byroom/:room', function(req, res, next) {
  var room=req.params.room;
  res.json({devices:devices.filter(d => d.room===room)});
});

module.exports = router;
