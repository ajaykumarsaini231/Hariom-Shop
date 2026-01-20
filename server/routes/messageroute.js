import express from "express";

import { createMessage, getMessages } from "../controllers/message.js";
import Messagevalidate from "../middleware/messageValidator.js";
import { messageSchema } from "../middleware/validator.js";
import { adminIdentifier } from "../middleware/adminIdentifier.js";

const router = express.Router();

// 📩 Create new message (public)
router.post(
  "/messages",
  Messagevalidate(messageSchema),
  createMessage
);

// 📬 Get all messages (admin only)
router.get(
  "/messages",
  adminIdentifier,
  getMessages
);

export default router;
