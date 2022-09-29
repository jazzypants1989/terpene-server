const mongoose = require("mongoose");

const scentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  terps: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Terp",
      required: true,
    },
  ],
  effects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Effect",
    },
  ],
  research: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Research",
    },
  ],
  strains: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Strain",
    },
  ],
  benefits: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Benefit",
    },
  ],
  nature: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Nature",
    },
  ],
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  likes: {
    type: Number,
    default: 0,
  },
});

const Scent = mongoose.model("Scent", scentSchema);

module.exports = Scent;
