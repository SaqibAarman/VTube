import express from "express";
import {
  addVideo,
  deleteVideo,
  getVideo,
  updateVideo,
  updateVideoView,
  trendingVideo,
  randomVideo,
  subscribedVideo,
  searchedVideos,
  tagsVideos,
} from "../controllers/Videos.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// CREATE VIDEO
router.post("/", verifyToken, addVideo);

// UPDATE VIDEO
router.put("/:id", verifyToken, updateVideo);

// DELETE VIDEO
router.delete("/:id", verifyToken, deleteVideo);

// GET A VIDEO
router.get("/find/:id", getVideo);

// UPDATE A VIDEO VIEW
router.get("/view/:id", updateVideoView);

// TRENDING VIDEOS
router.get("/trend", trendingVideo);

// RANDOM VIDEOS
router.get("/random", randomVideo);

// SUBSCRIBED CHANNEL VIDEOS
router.get("/sub", verifyToken, subscribedVideo);

// BY TAGS VIDEOS
router.get("/tags", tagsVideos);

// BY SEARCH VIDEOS
router.get("/search", searchedVideos);

export default router;
