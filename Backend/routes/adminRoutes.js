const express = require("express");
const { addAdmin } = require("../controllers/adminControllers");
const router = express.Router();

router.post("/admin", addAdmin);

module.exports = router;
