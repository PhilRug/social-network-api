const router = require('express').Router();
const {
  getComment,
  getSingleComment,
  createComment,
  updateComment,
  deleteComment,
  addCommentResponse,
  removeCommentResponse,
} = require('../../controllers/commentController');

// /api/comments
router.route('/').get(getComment).post(createComment);

// /api/comment/:commentId
router
  .route('/:commentId')
  .get(getSingleComment)
  .put(updateComment)
  .delete(deleteComment);

// /api/comments/:commentId/responses
router.route('/:commentId/responses').post(addCommentResponse);

// /api/comments/:commentId/responses/:responseId
router.route('/:commentId/responses/:responseId').delete(removeCommentResponse);

module.exports = router;
