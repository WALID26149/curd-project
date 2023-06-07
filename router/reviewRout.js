const express = require('express');
const reviewController = require('./../controllers/reviewController.js');
const authUsersData = require('./../controllers/authUsers.js');

const router = express.Router({ mergeParams: true });

router.use(authUsersData.protect);

router
  .route('/')
   .get(reviewController.getAllReviews)
   .post(
    authUsersData.protect,
    authUsersData.restrictTo('user'),
    reviewController.setProductUserIds,
    reviewController.createReview
   );

router
  .route('/:id')
  .patch(
    // authController.restrictTo('user', 'admin'),
    reviewController.updateReview
    )
  .delete(
    reviewController.deleteReview
  );

//.get(reviewController.getReview)   

module.exports = router;
