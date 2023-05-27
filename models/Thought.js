const { Schema, model, Types } = require('mongoose');

const ReactionSchema = new Schema(
{
  reactionId: {
    type: Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: [true, "Reaction text is Required"],
    maxlength: 280
  },
  username: {
    type: String,
    required: [true, "User name is required"]
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: d => d.toDateString()
  }
},
{
  toJSON: {
    getters: true
  }
});

const ThoughtSchema = new Schema(
{
  thoughtText: {
    type: String,
    required: [true, "Thought text is Required"],
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: d => d.toDateString()
  },
  username: {
    type: String,
    required: [true, "User name is Required"]
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, "User id is Required"]
  },
  reactions: [ReactionSchema]
},
{
  toJSON: {
    virtuals: true,
    getters: true
  },
  id: false
});

// virtual reactionCount - get total count of reactions
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// create the Thought model using the ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

// export the Thought model
module.exports = Thought;