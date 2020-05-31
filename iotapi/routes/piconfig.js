var express = require('express');
var router = express.Router();
var piconfig=require("../config/deviceconfig.json")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({piconfig:piconfig});
});

module.exports = router;
