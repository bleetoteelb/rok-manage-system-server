const Showlist = require('../models/showlist');

const getAllShowlists = async (req, res, next) => {
  const lists = await Showlist.find({});

  res.status(200).json({
    data: lists 
  });
}

const getShowlist = async (req, res, next) => {
  const filter = { name: req.params.id };
  const list = await Showlist.findOne(filter);

  res.status(200).json({
    data: list 
  });
}

const addShowlist = async (req, res, next) => {
  const filter = { _id: req.params.id };
  const update = { $push: { list: req.body.title } };

  const result =  await Showlist.findByIdAndUpdate(filter, update, {new: true});

  res.status(200).json({
    data: result 
  });
}

const deleteShowlist = async (req, res, next) => {
  const filter = { _id: req.params.id };
  const update = { $pull: { 'list': { title: req.body.title } } };

  const result =  await Showlist.findByIdAndUpdate(filter, update, {new: true});

  res.status(200).json({
    data: result 
  });
}

module.exports = {
  getAllShowlists,
  getShowlist,
  addShowlist,
  deleteShowlist
};
