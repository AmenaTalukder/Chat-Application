const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    min: 3,
    max: 20
  },
  email: {
    type: String,
    require: true,
    max: 50,
    unique: true
  },
  password: {
    type: String,
    require: true,
    min: 4,
    max: 20,
    unique: true
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false
  },
  avatarImage: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model("User", userSchema);
