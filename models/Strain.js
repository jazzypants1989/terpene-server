const mongoose = require("mongoose");

const strainSchema = new mongoose.Schema({
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
  scents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Scent",
    },
  ],
  benefits: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Benefit",
    },
  ],
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  image: {
    type: String,
  },
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

const Strain = mongoose.model("Strain", strainSchema);

module.exports = Strain;
