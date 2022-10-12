import express from "express";

import { showPostTopPicks, showPosts } from "../controllers/post.js";
 
const router = express.Router();
 
// Get All Posts
router.post('/posts', showPosts);

// Get Top Posts
router.post('/top-posts', showPostTopPicks);

// Get More Post by Offset
// router.get('/posts/:genre/:offset', showMorePostByOffsetandGenre);

export default router;