const { Comment, User } = require('../models');

module.exports = {
  async getComment(req, res) {
    try {
      const comment = await Comment.find();
      res.json(comment);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleComment(req, res) {
    try {
      const comment = await Comment.findOne({ _id: req.params.commentId })

      if (!comment) {
        return res.status(404).json({ message: 'No comment with that ID' });
      }

      res.json(comment);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new comment
  async createComment(req, res) {
    try {
      const comment = await Comment.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { comments: comment._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'Comment created, but found no user with that ID',
        });
      }

      res.json('Created the comment 🎉');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async updateComment(req, res) {
    try {
      const comment = await Comment.findOneAndUpdate(
        { _id: req.params.commentId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!comment) {
        return res.status(404).json({ message: 'No comment with this id!' });
      }

      res.json(comment);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async deleteComment(req, res) {
    try {
      const comment = await Comment.findOneAndRemove({ _id: req.params.commentId });

      if (!comment) {
        return res.status(404).json({ message: 'No comment with this id!' });
      }

      const user = await User.findOneAndUpdate(
        { comments: req.params.commentId },
        { $pull: { comments: req.params.commentId } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'Comment created but no user with this id!' });
      }

      res.json({ message: 'Comment successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Add a comment response
  async addCommentResponse(req, res) {
    try {
      const comment = await Comment.findOneAndUpdate(
        { _id: req.params.commentId },
        { $addToSet: { responses: req.body } },
        { runValidators: true, new: true }
      );

      if (!comment) {
        return res.status(404).json({ message: 'No comment with this id!' });
      }

      res.json(comment);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove comment response
  async removeCommentResponse(req, res) {
    try {
      const comment = await Comment.findOneAndUpdate(
        { _id: req.params.commentId },
        { $pull: { reactions: { responseId: req.params.responseId } } },
        { runValidators: true, new: true }
      )

      if (!comment) {
        return res.status(404).json({ message: 'No comment with this id!' });
      }

      res.json(comment);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
