const express = require('express');
const asyncify = require('express-asyncify');
const configService = require('../services/config');

const router = asyncify(express.Router());

/* GET users listing. */
router.route('/')
      .get(configService.getConfigs)
      .post(configService.createConfigs)
      .patch(configService.updateConfigs);

module.exports = router;
