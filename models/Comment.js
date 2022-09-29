const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "postModel",
  },
  postModel: {
    type: String,
    required: true,
    enum: [
      "Terp",
      "Scent",
      "Strain",
      "Nature",
      "Effect",
      "Research",
      "Benefit",
    ],
  },
  likes: {
    type: Number,
    default: 0,
    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
