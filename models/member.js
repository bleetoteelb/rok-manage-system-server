const mongoose = require('mongoose');

const memberSchema = mongoose.Schema({
  nickname: {
    type: String,
    required: [true, 'User must have nickname'],
  },
  accountNumber: {
    type: Number,
    required: [true, 'User must have accountNumber'],
  },
  power: {
    type: Number,
    required: [true, 'User must have power'],
  },
  join: {
    type: Boolean,
    default: false
  },
  group: {
    type: String
  },
  commanders: {
    type: String
  },
  updated: {
    type: Boolean,
    default: false
  },
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
