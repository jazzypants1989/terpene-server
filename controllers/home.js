const Terp = require("../models/Terp");
const Effect = require("../models/Effect");
const Research = require("../models/Research");
const Scent = require("../models/Scent");
const Strain = require("../models/Strain");
const Benefit = require("../models/Benefit");
const Nature = require("../models/Nature");
const User = require("../models/User");

exports.getIndex = (req, res) => {
  res.render("index.ejs");
};

exports.getFeed = async (req, res) => {
  try {
    const terps = await Terp.find({}).populate("users");
    const effects = await Effect.find({}).populate("users").lean();
    const researches = await Research.find({}).populate("users").lean();
    const scents = await Scent.find({}).populate("users").lean();
    const strains = await Strain.find({}).populate("users").lean();
    const benefits = await Benefit.find({}).populate("users").lean();
    const nature = await Nature.find({}).populate("users").lean();
    const posts = [
      terps,
      effects,
      researches,
      nature,
      scents,
      strains,
      benefits,
    ];
    res.render("feed.ejs", {
      posts: posts,
    });
    console.log(posts);
  } catch (err) {
    console.log(err);
  }
};
