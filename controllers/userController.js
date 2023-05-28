const { User } = require('../models');

const userController = {
  // get all users
  async getAllUsers(req, res) {
    try {
      const dbUserData = await User.find({})
        .populate({ path: 'friends' })
        .populate({
          path: 'thoughts',
          select: '-__v',
        })
        .select('-__v');
      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  },

  // get one user
  async getUser({ params }, res) {
    try {
      const dbUserData = await User.findOne({ _id: params.id })
        .populate({ path: 'friends' })
        .populate({
          path: 'thoughts',
          select: '-__v',
        })
        .select('-__v');
      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  },

  // add a new User
  async addUser({ body }, res) {
    try {
      // Check if a user with the same username or email already exists
      const existingUser = await User.findOne({
        $or: [
          { username: body.username },
          { email: body.email }
        ]
      });

      if (existingUser) {
        return res.status(400).json({ message: 'Username or email already exists. Please choose a different one.' });
      }

      // Create the user if no similar user or email exists
      const dbUserData = await User.create(body);
      res.json(dbUserData);
    } catch (err) {
      res.json(err);
    }
  },


  // update a user
  async updateUser({ params, body }, res) {
    try {
      const dbUserData = await User.findOneAndUpdate(
        { _id: params.id },
        body,
        { new: true, runValidators: true }
      );
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbUserData);
    } catch (err) {
      res.json(err);
    }
  },

  // delete a User
  async deleteUser({ params }, res) {
    try {
      const dbUserData = await User.findOneAndDelete({ _id: params.id });
      res.json(dbUserData);
    } catch (err) {
      res.json(err);
    }
  },

  // add a friend to user
  async addFriend({ params }, res) {
    try {
      const dbFriendData = await User.findByIdAndUpdate(
        { _id: params.userId },
        { $push: { friends: { friendId: params.friendId } } },
        { new: true, runValidators: true }
      );
      if (!dbFriendData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbFriendData);
    } catch (err) {
      res.json(err);
    }
  },

  // remove friend
  async deleteFriend({ params }, res) {
    try {
      const dbFriendData = await User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { friends: { friendId: params.friendId } } },
        { new: true }
      );
      res.json(dbFriendData);
    } catch (err) {
      res.json(err);
    }
  },
};

module.exports = userController;