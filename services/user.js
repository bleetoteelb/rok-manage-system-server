const User = require('../models/user');

const getAllUser = async (req, res, next) => {
  const result = await User.find({id:{$ne:"admin"}},{__v:0,pw:0}); 
  
  res.status(200).json({
    data:result
  });
}
const createUser = async (req, res, next) => {
  console.log(req.body);
  const result = await User.create(req.body);

  res.status(200).json({
    data:"done"
  });
}

module.exports = {
  getAllUser,
  createUser
};
