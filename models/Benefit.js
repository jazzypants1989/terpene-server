const mongoose = require("mongoose");

const benefitSchema = new mongoose.Schema({
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

const Benefit = mongoose.model("Benefit", benefitSchema);

module.exports = Benefit;
