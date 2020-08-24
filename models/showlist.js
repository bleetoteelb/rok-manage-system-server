const mongoose = require('mongoose');

const showlistSchema = mongoose.Schema({
  name: {
    type: String 
  },
  list: {
    type: [Object]
  }
});

const Showlist = mongoose.model('Showlist', showlistSchema);

module.exports = Showlist;
