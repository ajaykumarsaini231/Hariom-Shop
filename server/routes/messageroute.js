const { createMessage, getMessages } = require("../controllers/message.js");
const Messagevalidate = require("../middleware/messageValidator.js");
const { messageSchema } = require("../middleware/validator.js");

const express = require("express");
const router = express.Router();
const { adminIdentifier } = require("../middleware/adminIdentifier.js");

router.post("/message", Messagevalidate(messageSchema), createMessage);
router.get("/messages", adminIdentifier,getMessages);

module.exports = router;
