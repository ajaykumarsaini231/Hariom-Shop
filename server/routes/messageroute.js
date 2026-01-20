import express from "express";
import { 
  createMessage, 
  getMessages, 
  updateMessageStatus, 
  deleteMessage 
} from "../controllers/message.js"; // Import new functions
import Messagevalidate from "../middleware/messageValidator.js";
import { messageSchema } from "../middleware/validator.js";
import { adminIdentifier } from "../middleware/adminIdentifier.js";

const router = express.Router();

// 📩 Create new message (public)
router.post("/messages", Messagevalidate(messageSchema), createMessage);

// 📬 Get all messages (admin only)
router.get("/messages", adminIdentifier, getMessages);

// ✅ Mark as Solved/Unsolved (admin only)
router.patch("/messages/:id", adminIdentifier, updateMessageStatus);

// 🗑️ Delete message (admin only)
router.delete("/messages/:id", adminIdentifier, deleteMessage);

export default router;