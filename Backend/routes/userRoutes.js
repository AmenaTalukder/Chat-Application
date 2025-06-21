const {
  register,
  login,
  avatar,
  getusers
} = require("../controllers/userControllers");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id", avatar);
router.get("/users/:id", getusers);

module.exports = router;
