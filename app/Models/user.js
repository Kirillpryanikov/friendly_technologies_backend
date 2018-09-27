const mongoose = require('mongoose');

const UserModel = mongoose.model('Users',{
  name: String,
  email:{
    type: String,
    unique: true
  },
  password: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = UserModel;
