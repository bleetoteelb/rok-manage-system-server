const Violate = require('../models/violate');

const getAllViolate = async (req, res, next) => {
  const result = await Violate.find({}); 
  
  res.status(200).json({
    data:result
  });
}

const deleteViolate = async (req, res, next) => {
  const result = await Violate.findByIdAndDelete({_id:req.body._id});
  res.status(200).json({
    data: "success"
  });
}

const createViolate = async (req, res, next) => {
  const result = await Violate.create(req.body);
  res.status(200).json({
    data: result
  });
}

module.exports = {
  getAllViolate,
  createViolate,
  deleteViolate
};
