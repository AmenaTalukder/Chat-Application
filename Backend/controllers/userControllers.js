const User = require("../models/userModels");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const usernameCheak = await User.findOne({ username });
    if (usernameCheak) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const emailCheak = await User.findOne({ email });
    if (emailCheak) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword
    });
    await user.save();

    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(400)
        .json({ msg: "Incorrect Username or password", status: false });
    }
    const isValidPassword = await bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      return res
        .status(400)
        .json({ msg: "Incorrect Username or password", status: false });
    }
    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};

module.exports.avatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    if (!userId || !avatarImage) {
      return res.status(400).json({ message: "Invalid user ID or image data" });
    }
    const userData = await User.findByIdAndUpdate(
      userId,
      { isAvatarImageSet: true, avatarImage },
      { new: true }
    );

    if (!userData) {
      return res.status(400).json({ error: "User not found" });
    }
    console.log("Updating user:", userId, "with avatar:", avatarImage);
    console.log("Updated User Data:", userData);

    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage
    });
  } catch (error) {
    console.error("Error setting avatar:", error);
    next(error);
  }
};

module.exports.getusers = async (req, res, next) => {
  console.log("Fetching users for ID:", req.params.id);
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const users = await User.find({ _id: { $ne: id } }).select([
      "username",
      "email",
      "avatarImage",
      "_id"
    ]);
    res.json({ success: true, data: users });
  } catch (error) {
    const message = error.response?.data?.message || "An error occurred";
    alert(`Failed to load contacts: ${message}`);
    console.error("Error fetching contacts:", error);
    next(error);
  }
};
