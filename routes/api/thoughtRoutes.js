const router = require('express').Router();

// import all thought contoller functions
const {
    getAllThoughts,
    getThought,
    addThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

// /api/thoughts routes
router
    .route('/')
    .post(addThought)
    .get(getAllThoughts);

// /api/thoughts/:userId/:thoughtId routes
router
    .route('/:thoughtId')
    .get(getThought)
    .put(updateThought)
    .post(addReaction)
    .delete(deleteThought);

// /api/thoughts/:userId/:reactionId routes
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;