import express from "express";

import { showPostTopPicks, showPosts, test } from "../controllers/post.js";
 
const router = express.Router();
 
// Get All Posts
router.post('/posts', showPosts);

// Get Top Posts
router.post('/top-posts', showPostTopPicks);

router.get('/file-base-64', test);

// Get More Post by Offset
// router.get('/posts/:genre/:offset', showMorePostByOffsetandGenre);

export default router;