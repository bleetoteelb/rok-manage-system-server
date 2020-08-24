const mongoose = require('mongoose');
// const argon2 = require('argon2');

const userSchema = mongoose.Schema({
  id: {
    type: String,
    required: [true, 'User must have a id'],
  },
  pw: {
    type: String,
    required: [true, 'User must have a pw'],
  },
  role: {
    type: String,
    default: "user"
  },
  member: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Member',
  }
});

userSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'member',
    select: '-__v',
  });

  next();
});

userSchema.methods.correctPassword = async ( reqPw, dbPw ) => {
  if(reqPw===dbPw) return true;
  else return false;
}

const User = mongoose.model('User', userSchema);

module.exports = User;
