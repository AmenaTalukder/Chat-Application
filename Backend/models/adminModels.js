const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    min: 3,
    max: 20
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true
  },
  password: {
    type: String,
    required: true,
    min: 4,
    max: 20
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false
  },
  avatarImage: {
    type: String,
    default: ""
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Admin", adminSchema);
