const express = require('express');
const asyncify = require('express-asyncify');
const userService = require('../services/auth');

const router = asyncify(express.Router());

router.post('/login', userService.login)

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', userService.login);

module.exports = router;
