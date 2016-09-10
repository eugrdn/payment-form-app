var express = require('express');
var router = express.Router();
var pp = require('../handlers/payment-process.js');

router.post('/', pp.post);

module.exports = router;

