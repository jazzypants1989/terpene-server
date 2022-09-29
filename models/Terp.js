const mongoose = require("mongoose");

const terpSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  strains: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Strain",
    },
  ],
  nature: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Nature",
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

const Terp = mongoose.model("Terp", terpSchema);

module.exports = Terp;
