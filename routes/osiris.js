const express = require('express');
const router = express.Router();
const osirisService = require('../services/osiris');


router.route('/group')
  .get(osirisService.getGroups)
  .post(osirisService.createGroup)
  .patch(osirisService.updateGroup)
  .delete(osirisService.deleteGroup);

router.get('/member/init',osirisService.deleteAllMember);

/* GET home page. */
router.route('/member')
  .get(osirisService.getAllMembers)
  .post(osirisService.registerMember2)
  .patch(osirisService.registerMember)
  .delete(osirisService.deleteMember)

module.exports = router;
