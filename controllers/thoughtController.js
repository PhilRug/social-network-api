const { Thought, User } = require('../models');

const thoughtController = {
  // get all thoughts
  async getAllThoughts(req, res) {
    try {
      const dbThoughtData = await Thought.find({});
      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  // get thought by id
  async getThought({ params }, res) {
    try {
      const dbThoughtData = await Thought.findOne({ _id: params.thoughtId });
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  // add thought to user
  async addThought({ body }, res) {
    try {
      const createdThought = await Thought.create(body);
      const dbThoughtData = await User.findOneAndUpdate(
        { _id: body.userId },
        { $push: { thoughts: createdThought._id } },
        { new: true }
      );
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbThoughtData);
    } catch (err) {
      res.json(err);
    }
  },

  // update thought by id
  async updateThought({ params, body }, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        body,
        { new: true }
      );
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(dbThoughtData);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // remove thought and entry from user
  async deleteThought({ params }, res) {
    try {
      const dbThoughtData = await Thought.findOneAndDelete({ _id: params.thoughtId });
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      await User.findOneAndUpdate(
        { _id: dbThoughtData.userId },
        { $pull: { thoughts: { _id: params.thoughtId } } },
        { new: true }
      );
      res.json(dbThoughtData);
    } catch (err) {
      res.json(err);
    }
  },

  // add a reaction to a thought
  async addReaction({ params, body }, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $push: { reactions: body } },
        { new: true, runValidators: true }
      );
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(dbThoughtData);
    } catch (err) {
      res.json(err);
    }
  },

  // remove a reaction from a thought
  async deleteReaction({ params }, res) {
    try {
      const dbThoughtData = await Thought.findByIdAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reactions: { reactionId: params.reactionId } } },
        { new: true }
      );
      res.json(dbThoughtData);
    } catch (err) {
      res.json(err);
    }
  },
};

module.exports = thoughtController;