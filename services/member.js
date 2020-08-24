const Member = require('../models/member');
const User = require('../models/user');

const getAllMember = async (req, res, next) => {
  const result = await Member.find({}); 
  
  res.status(200).json({
    data:result
  });
}

const updateUserMember = async (userId, memberId) => {
  const result = User.findOneAndUpdate({_id:userId},{ $push:{ member: memberId }},{new: true});
  if(!result) return false;
  return true;
}

const createMember = async (req, res, next) => {
  const result = await Member.create(req.body);

  if(req.body.user) {
    const updateResult = await updateUserMember(req.body.user,result._id);
    if (!updateResult) return next(Error('Error to update User Member in memberService'));
  }

  res.status(200).json({
    data: result
  });
}

module.exports = {
  getAllMember,
  createMember
};
