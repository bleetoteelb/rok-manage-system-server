const mongoose = require('mongoose');
const User = require('../models/user');

async function connectDB() {
  try {
	const DB_URL = 'mongodb://localhost/rok';

    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log(`DB Connected!`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

async function setDefaultUser() {
  const result = await User.find({});
  if (result.length === 0) {
    const defaultAccount = { id: 'admin', pw: 'admin'};
    await User.create(defaultAccount);
    console.log('create default account');
  }
}

async function init() {
  await connectDB();
  await setDefaultUser();
}

module.exports = {
  init,
  connectDB
}
