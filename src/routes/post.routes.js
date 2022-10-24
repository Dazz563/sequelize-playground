const {
    addAllPostsToUser, //
    countAllPosts,
    removePost,
    removeAllPosts,
} = require('../controllers/post.controller');

const express = require('express');
const postRoutes = express.Router();

postRoutes.post('/add-all-posts-to-user', addAllPostsToUser);
postRoutes.post('/count-user-posts', countAllPosts);
postRoutes.post('/remove-post', removePost);
postRoutes.post('/remove-all-posts', removeAllPosts);

module.exports = postRoutes;
