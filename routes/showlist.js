const express = require('express');
const asyncify = require('express-asyncify');
const showlistService = require('../services/showlist');

const router = asyncify(express.Router());

/* GET users listing. */
router.route('/')
      .get(showlistService.getAllShowlists);

router.route('/:id')
      .get(showlistService.getShowlist)
      .post(showlistService.addShowlist)
      .delete(showlistService.deleteShowlist);

module.exports = router;
