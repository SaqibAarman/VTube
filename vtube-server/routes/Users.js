import express from "express";
import {
  deleteUser,
  dislikeVideo,
  getUser,
  likeVideo,
  subscribeUser,
  unSubscribeUser,
  updateUser,
} from "../controllers/Users.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// UPDATE USER
router.put("/:id", verifyToken, updateUser);

// DELETE USER
router.delete("/:id", verifyToken, deleteUser);

// GET A USER
router.get("/find/:id", getUser);

// SUBSCRIBE USER  --> id = Channel 
router.put("/sub/:id", verifyToken, subscribeUser);

// UNSUBSCRIBE USER
router.put("/unSub/:id", verifyToken, unSubscribeUser);

// LIKE A VIDEO
router.put("/like/:videoId", verifyToken, likeVideo);

//   DISLIKE A VIDEO
router.put("/dislike/:videoId", verifyToken, dislikeVideo);

export default router;
