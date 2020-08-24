const fs = require('fs');
const mongoose = require('mongoose');
const Member = require('../models/member');
const User = require('../models/user');
const Showlist = require('../models/showlist');
const Config = require('../models/config');
const Osiris = require('../models/osiris');
const { connectDB } = require('../services/init');

const datas = [];

function pushData(model, name) {
  const data = JSON.parse(
    fs.readFileSync(`${__dirname}/${name}.json`, 'utf-8')
  );
  datas.push({ model, data });
}

// pushData(User, 'users');
pushData(Member, 'members');
// pushData(Showlist, 'showlists');
// pushData(Config, 'configs');
// pushData(Osiris, 'osiris');

if (
  process.argv.length < 2 ||
  (process.argv[2] !== '--import' && process.argv[2] !== '--delete')
) {
  console.log('Usage: node ./dev-data/importData.js --import or --delete');
  process.exit(1);
}

// Import data into db
const importData = async () => {
  try {
    await connectDB();

    const createPromises = datas.map((elem) => elem.model.create(elem.data,{checkKeys:false}));
    await Promise.all(createPromises);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// delete data from db
const deleteData = async () => {
  try {
    await connectDB();
    // TODO: Delete whole collection, not just documents inside.
    //       Collection and Database name is left after drop.
    await mongoose.connection.db.dropDatabase();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
