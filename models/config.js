const mongoose = require('mongoose');

const configSchema = mongoose.Schema({
  openOsiris:{
    type: Boolean,
    default: false
  },
  openOsirisRegister:{
    type: Boolean,
    default: false
  },
  osirisPower: {
    type: String
  }
});

const Config = mongoose.model('Config', configSchema);

module.exports = Config;
