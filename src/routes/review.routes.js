const {addReview, getAllReviews} = require('../controllers/review.controller');

const express = require('express');
const reviewRoutes = express.Router();

reviewRoutes.post('/create-review', addReview);
reviewRoutes.get('/all-reviews', getAllReviews);

module.exports = reviewRoutes;
