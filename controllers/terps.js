const cloudinary = require("../middleware/cloudinary");
const Terp = require("../models/Terp");
const Comment = require("../models/Comment");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const terps = await Terp.find({ user: req.user.id });
      res.render("profile.ejs", { terps: terps, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getTerp: async (req, res) => {
    try {
      const terp = await Terp.findById(req.params.id);
      res.render("terp.ejs", { terp: terp, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createTerp: async (req, res) => {
    try {
      await Terp.create({
        name: req.body.name,
        description: req.body.description,
        users: req.body.users,
      });
      console.log("Terp has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },

  upvoteTerp: async (req, res) => {
    try {
      const terp = await Terp.findById(req.params.id);
      if (terp.votes.includes(req.user.id)) {
        console.log("You already upvoted this terp!");
        res.redirect("/terp/" + req.params.id);
      } else {
        terp.votes.push(req.user.id);
        terp.voteCount++;
        await terp.save();
        console.log("Upvote successful!");
        res.redirect("/terp/" + req.params.id);
      }
    } catch (err) {
      console.log(err);
    }
  },
  downvoteTerp: async (req, res) => {
    try {
      const terp = await Terp.findById(req.params.id);
      if (terp.votes.includes(req.user.id)) {
        terp.votes.pull(req.user.id);
        terp.voteCount--;
        await terp.save();
        console.log("Downvote successful!");
        res.redirect("/terp/" + req.params.id);
      } else {
        console.log("You haven't upvoted this terp yet!");
        res.redirect("/terp/" + req.params.id);
      }
    } catch (err) {
      console.log(err);
    }
  },
  editTerp: async (req, res) => {
    try {
      const terp = await Terp.findById(req.params.id);
      if (terp.user == req.user.id) {
        terp.title = req.body.title;
        terp.caption = req.body.caption;
        terp.isEdited = true;
        await terp.save();
        console.log("Terp has been edited!");
        res.redirect("/profile");
      } else {
        console.log("You can't edit this terp!");
        res.redirect("/profile");
      }
    } catch (err) {
      console.log(err);
    }
  },
  deleteTerp: async (req, res) => {
    try {
      // Find terp by id
      let terp = await Terp.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(terp.cloudinaryId);
      // Delete terp from db
      await Terp.remove({ _id: req.params.id });
      console.log("Deleted Terp");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
