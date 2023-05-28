const router = require('express').Router();

// import all user controller functions
const {
    getAllUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

//  /api/users routes
router
    .route('/')
    .get(getAllUsers)
    .post(addUser);

// /api/users/:userId routes
router
    .route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

// /api/users/:userId/friends/:friendId route
router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;