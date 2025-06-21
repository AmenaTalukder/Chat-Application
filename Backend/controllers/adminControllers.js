const Admin = require("../models/adminModels");
const bcrypt = require("bcrypt");

module.exports.addAdmin = async (req, res, next) => {
  try {
    const { username, email, password, isAdmin } = req.body;

    const usernameCheck = await Admin.findOne({ username });
    if (usernameCheck) {
      return res.status(400).json({ message: "Admin Username already exists" });
    }

    const emailCheck = await Admin.findOne({ email });
    if (emailCheck) {
      return res.status(400).json({ message: "Admin Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new Admin({
      username,
      email,
      password: hashedPassword,
      isAdmin
    });

    await user.save();

    return res.status(201).json({ message: "Admin created successfully" });
  } catch (ex) {
    next(ex);
  }
};
