const mongoose = require('mongoose');

const memberSchema = mongoose.Schema({
  nickname: {
    type: String,
    required: [true, 'User must have a id'],
  },
  power: {
    type: [Object],
  },
  death: {
    type: [Object],
  },
  kill: {
    type: [Object],
  },
  give: {
    type: [Object],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  group: {
    type: String
  }
});

memberSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: '_id id',
  });

  next();
});


const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
