const Config = require('../models/config');

const getConfigs = async (req, res, next) => {
  const result = await Config.find({}); 
  
  res.status(200).json({
    data: result[0]
  });
}

const createConfigs = async (req, res, next) => {
  const result = await Config.create(req.body);

  res.status(200).json({
    data: result
  });
}

const updateConfigs = async (req, res, next) => {
  const filter = { _id: req.body._id }; 
  const update = {};
  
  if (req.body.openOsiris !== undefined) {
    update.openOsiris = req.body.openOsiris;
  } else if (req.body.openOsirisRegister !== undefined) {
    update.openOsirisRegister = req.body.openOsirisRegister;
  } else if (req.body.power) {
    update.osirisPower = req.body.osirisPower;
  }

  console.log(update);
  const result = await Config.findByIdAndUpdate(filter, update, {new: true});

  res.status(200).json({
    data: result
  });
}

module.exports = {
  getConfigs,
  createConfigs,
  updateConfigs
};
