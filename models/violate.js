const mongoose = require('mongoose');

const violateSchema = mongoose.Schema({
  nickname: {
    type: String,
    required: [true, 'User must have nickname'],
  },
  accountNumber: {
    type: Number,
    required: [true, 'User must have accountNumber'],
  },
  reason: {
    type: String
  },
  etcReason: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Violate = mongoose.model('Violate', violateSchema);

module.exports = Violate;
