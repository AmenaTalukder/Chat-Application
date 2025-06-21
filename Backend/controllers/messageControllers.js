const MessageModel = require("../models/messageModel");
const bcrypt = require("bcrypt");

module.exports.addMessage = async (req, res, next) => {
  try {
    const { message, from, to } = req.body;
    const data = await MessageModel.create({
      message: { text: message },
      users: [from, to],
      sender: from
    });
    console.log("Message saved:", data);
    if (data) return res.json({ message: "Message added succesfully" });
    return res.json({ message: "Failed to added database data" });
  } catch (error) {
    next(error);
  }
};

module.exports.getMessage = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
