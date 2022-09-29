const mongoose = require("mongoose");

const researchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
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
  benefits: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Benefit",
    },
  ],
  strains: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Strain",
    },
  ],
  scents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Scent",
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

const Research = mongoose.model("Research", researchSchema);

module.exports = Research;
