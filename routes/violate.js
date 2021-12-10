const express = require('express');
const asyncify = require('express-asyncify');
const violateService = require('../services/violate');

const router = asyncify(express.Router());

/* GET users listing. */
router.route('/')
      .get(violateService.getAllViolate)
      .post(violateService.createViolate)
      .delete(violateService.deleteViolate);

module.exports = router;
