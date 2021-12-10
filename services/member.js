const Member = require('../models/member');
const User = require('../models/user');

const getAllMember = async (req, res, next) => {
  const result = await Member.find({}); 
  
  res.status(200).json({
    data:result
  });
}

const deletePower = async function(body) {
  const update = { $pull: {"power": {} }};
  if(body._id) {
    filter = { _id: body._id };
    result = await Member.findByIdAndUpdate(filter,update,{new: true});
  } else if (body.accountNumber) {
    filter = { accountNumber: body.accountNumber };
    result = await Member.findOneAndUpdate(filter,update,{new: true});
  }

  if(result) return result;
  else return null;

}

const updateAll = async function(ad) {
  let result;
  for (var i=0; i<ad.length;i++){
    console.log(ad[i].accountNumber);
    if (ad[i].nickname) {
      result = await updateNickname({ accountNumber : ad[i].accountNumber })
      if (!result) return next(Error('Error to update Member Nicknmae in memberService'));
    }
    result = await deletePower(ad[i]);
    if (!result) return next(Error('Error to delete Power in memberService'));

    result = await pushPower(ad[i]);
  }
  return true; 
}

const updateMember = async (req, res, next) => {
  let result;
  console.log("?");
  console.log(req.body);
  try{
  const filter = { accountNumber: req.body.accountNumber };
  const update = { 
    nickname: req.body.nickname,
    power: req.body.power, 
    commanders: req.body.commanders,
    updated: true
  };
  if (req.body.nickname) update['nickname'] = req.body.nickname
  if (req.body.power) update['power'] = req.body.power
  if (req.body.commanders) update['commanders'] = req.body.commanders

  console.log("??");
  result = await Member.findOneAndUpdate(filter,update,{new: true});
  /*
  if(req.body.updateAll) {
    result = await updateAll(req.body.alldata);
    if (!result) return next(Error('Error to update ALL Member in memberService'));
  }
  if(req.body.nickname) {
    result = await updateNickname(req.body);
    if (!result) return next(Error('Error to update Member Nickname in memberService'));
  }
  if(req.body.power) {
    result = await pushPower(req.body);
    if (!result) return next(Error('Error to update Member Power in memberService'));
  }
*/
  res.status(200).json({
    data: result
  });
  } catch (e) {
    console.log(e);
    throw e;
  }
}

const updateNickname = async function(body) {
  let filter, result;
  const update = { nickname: body.nickname };

  if(body._id) {
    filter = { _id: body._id };
    result = await Member.findByIdAndUpdate(filter,update,{new: true});
  } else if (body.accountNumber) {
    filter = { accountNumber: body.accountNumber };
    result = await Member.findOneAndUpdate(filter,update,{new: true});
  }

  if(result)
    return result;
  else
    return null;
}

const pushPower = async function(body) {
  const update = { $push: { power: {name: body.power[0].name, value: body.power[0].value }}};
  if(body._id) {
    filter = { _id: body._id };
    result = await Member.findByIdAndUpdate(filter,update,{new: true});
  } else if (body.accountNumber) {
    filter = { accountNumber: body.accountNumber };
    result = await Member.findOneAndUpdate(filter,update,{new: true});
  }

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
  console.log(req.body);
  const result = await Member.create(req.body);
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
