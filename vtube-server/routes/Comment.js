import express from "express";
import {
  addComment,
  deleteComment,
  getComments,
} from "../controllers/Comment.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// CREATE COMMENT
router.post("/", verifyToken, addComment);

// DELETE COMMENT
router.delete("/:id", verifyToken, deleteComment);

// GET COMMENTS
router.get("/:videoId", getComments);

export default router;
