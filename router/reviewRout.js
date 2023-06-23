const express = require('express');
const reviewController = require('../controller/reviewController.js');
const authUsersData = require('../controller/authUsers.js');

const router = express.Router({ mergeParams: true });

// Protect all routes after this middleware
router.use(authUsersData.protect)

router
  .route('/')
   .get(reviewController.getAllReviews)
   .post(
    authUsersData.restrictTo('user'),
    reviewController.setProductUserIds,
    reviewController.createReview
   );

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authUsersData.restrictTo('user', 'admin'),
    reviewController.updateReview
    )
  .delete(
    authUsersData.restrictTo('user', 'admin'),
    reviewController.deleteReview
    );   

module.exports = router;
