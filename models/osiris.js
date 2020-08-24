const mongoose = require('mongoose');

const osirisSchema = mongoose.Schema({
  name: {
    type: String
  },
  time: {
    type: String
  }
});

const Osiris = mongoose.model('Osiris', osirisSchema);

module.exports = Osiris;
