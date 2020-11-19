const Member = require('../models/member');
const User = require('../models/user');

const getAllMember = async (req, res, next) => {
  const result = await Member.find({}); 
  
  res.status(200).json({
    data:result
  });
}

const updateMember = async (req, res, next) => {
  let result;
  if(req.body.nickname) {
    result = await updateNickname(req.body);
    console.log(result);
    if (!result) return next(Error('Error to update Member Nickname in memberService'));
  }
  if(req.body.power) {
    result = await pushPower(req.body);
    if (!result) return next(Error('Error to update Member Power in memberService'));
  }

  res.status(200).json({
    data: result
  });
}

const updateNickname = async function(body) {
  const filter = { _id: body._id };
  const update = { nickname: body.nickname };
  const result = await Member.findByIdAndUpdate(filter,update,{new: true});

  if(result)
    return result;
  else
    return null;
}

const pushPower = async function(body) {
  const filter = { _id: body._id };
  const update = { $push: { power: {key: body.key, value: body.power }}};
  const result = await Member.findByIdAndUpdate(filter,update,{new: true});

  if(result)
    return true;
  else
    return false;
}

const updateUserMember = async (userId, memberId) => {
  const result = User.findOneAndUpdate({_id:userId},{ $push:{ member: memberId }},{new: true});
  if(!result) return false;
  return true;
}

const deleteMember = async (req, res, next) => {
  const result = await Member.findByIdAndDelete({_id:req.body._id});
  res.status(200).json({
    data: "success"
  });
}

const createMember = async (req, res, next) => {
  const result = await Member.create({nickname:req.body.nickname});

  if(req.body.power) {
    const body = {
      _id: result._id,
      power: req.body.power,
      key: req.body.key
    }
    const updateResult = await pushPower(body);
    if (!updateResult) return next(Error('Error to update User Member in memberService'));
  }

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
  createMember,
  updateMember,
  deleteMember
};
