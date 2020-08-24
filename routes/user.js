const express = require('express');
const asyncify = require('express-asyncify');
const userService = require('../services/user');

const router = asyncify(express.Router());


/* GET users listing. */
router.route('/')
      .get(userService.getAllUser)
      .post(userService.createUser);

module.exports = router;
