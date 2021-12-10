const Member = require('../models/member');
const Osiris = require('../models/osiris');
const Violate = require('../models/violate');

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

const staticLS = ["35574614","33655875","33714415","33759346","35448845","34256084","35321961","33655370","41430099","32887176","35400779","33699678","33776558","33675955","33718909","35558492","34016248","35417330","35458848","35321350","35410243","35767157","35396049","33646593","33685016","33867166","36522168","35438354","33657994","33944238","33664834","46289706","46106691","39995535","34466227"];
const banAll = []

const registerMember = async (req, res, next) => {
  const filter = { nickname: req.body.nickname };
  let result;
  let msg = "DONE";
  const userInfo = await Member.findOne(filter);
  const isViolate = await Violate.find({accountNumber: userInfo.accountNumber});
  if (isViolate.length > 0) {
    msg= "BAN"
    result = isViolate[0]; 
  } else {
    const num = await getGroupCount(req.body.group);
    if (num >= 30) {
      msg = "OVER";
    } else {
      const update = { group: req.body.group };
      result = await Member.findOneAndUpdate(filter,update, {new:true})
    }
  }
  res.status(200).json({
    data: result,
    msg: msg
  });
}

const deleteMember = async (req, res, next) => {
  const filter = { _id: req.body._id };
  const update = { $unset: { group: 1 }};

  const result = await Member.findByIdAndUpdate(filter, update, { new: true });

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
  deleteMember,
  deleteAllMember
};
