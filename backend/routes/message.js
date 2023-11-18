const messageController = require("../controllers/MessageController");
const router = require("express").Router();

router.post("/addmsg/", messageController.addMessage);
router.post("/getmsg/", messageController.getMessages);

module.exports = router;
