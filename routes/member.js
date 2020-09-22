const express = require('express');
const asyncify = require('express-asyncify');
const memberService = require('../services/member');

const router = asyncify(express.Router());

/* GET users listing. */
router.route('/')
      .get(memberService.getAllMember)
      .post(memberService.createMember)
      .patch(memberService.updateMember)
      .delete(memberService.deleteMember);

module.exports = router;
