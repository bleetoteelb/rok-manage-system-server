const Member = require('../models/member');
const Osiris = require('../models/osiris');

const getGroups = async (req, res, next) => {
  const groups = await Osiris.find({});

  res.status(200).json({
    data: groups
  });
}
const getGroupCount = async (name) => {
  return await Member.countDocuments({group:name});
}

const createGroup = async (req, res, next) => {
  const group = await Osiris.create(req.body);

  res.status(200).json({
    data: group
  });
}

const updateGroup = async (req, res, next) => {
  const _id = req.body._id;
  const filter = { _id: req.body._id };
  const update = {};
  if (req.body.name) update.name = req.body.name;
  if (req.body.time) update.time = req.body.time;
  const group = await Osiris.findByIdAndUpdate(filter, update, { new: true });

  res.status(200).json({
    data: group
  });
}

const deleteGroup = async (req, res, next) => {
  console.log(req.body);
  const result = await Osiris.findByIdAndDelete({_id:req.body._id});

  res.status(200).json({
    data: "success" 
  });
}

const getAllMembers = async (req, res, next) => {
  const result = [];
  const groups = await Osiris.find({});
  const groupPromise = groups.map(async (group) => {
    const members = await Member.find({group: group.name}).select('_id nickname power highestTier');
    result.push({name:group.name, members:members, time:group.time});
  });

  await Promise.all(groupPromise);

  res.status(200).json({
    data: result
  });
}

const registerMember = async (req, res, next) => {
  const filter = { _id: req.body._id };
  const update = { group: req.body.group };
  const result = await Osiris.findByIdAndUpdate(filter, update, { new: true });

  res.status(200).json({
    data: result
  });
}

const registerMember2 = async (req, res, next) => {
  const filter = { nickname: req.body.nickname };
  let result;
  let msg = "DONE";
  const num = await getGroupCount(req.body.group);
  console.log(num);
  if (num >= 30) {
    msg = "OVER";
  } else {
    const isExist = await Member.findOne(filter);
    const update = { group: req.body.group };
    if (isExist) {
      result = await Member.findOneAndUpdate(filter,update, {new:true})
      msg = "UPDATE";
      console.log(msg);
      console.log(result);
    } else {
      result = await Member.create({nickname: req.body.nickname, group: req.body.group });
      msg = "NEW";
      console.log(msg);
    }
  }

  res.status(200).json({
    data: result,
    msg: msg
  });
}

const deleteMember = async (req, res, next) => {
  const _id = req.body._id;
  const filter = { _id: req.body._id };
  const update = { $unset: { group: 1 }};

  const result = await User.findByIdAndUpdate(filter, update, { new: true });

  res.status(200).json({
    data: result
  });
}

const deleteAllMember = async (req, res, next) => {
  const update = { $unset: { group: 1 }};

  const result = await Member.updateMany({}, update, { new: true });

  res.status(200).json({
    data: "success"
  });
}

module.exports = {
  getGroups,
  createGroup,
  updateGroup,
  deleteGroup,
  getAllMembers,
  registerMember,
  registerMember2,
  deleteMember,
  deleteAllMember
};
