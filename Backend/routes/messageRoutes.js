const { addMessage, getMessage } = require("../controllers/messageControllers");

const router = require("express").Router();

router.post("/addmessage", addMessage);
router.post("/getmessage", getMessage);

module.exports = router;
