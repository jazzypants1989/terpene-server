const cloudinary = require("../middleware/cloudinary");
const Scent = require("../models/Scent");
const Comment = require("../models/Comment");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const scents = await Scent.find({ user: req.user.id });
      res.render("profile.ejs", { scents: scents, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getScent: async (req, res) => {
    try {
      const scent = await Scent.findById(req.params.id);
      res.render("scent.ejs", { scent: scent, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createScent: async (req, res) => {
    try {
      await Scent.create({
        name: req.body.name,
        description: req.body.description,
        terps: [req.body.terps],
        users: req.body.users,
      });
      console.log("Scent has been added!");
      res.redirect("/post/" + req.params.postId);
    } catch (err) {
      console.log(err);
    }
  },
  upvoteScent: async (req, res) => {
    try {
      const scent = await Scent.findById(req.params.id);
      if (scent.votes.includes(req.user.id)) {
        console.log("You already upvoted this scent!");
        res.redirect("/scent/" + req.params.id);
      } else {
        scent.votes.push(req.user.id);
        scent.voteCount++;
        await scent.save();
        console.log("Upvote successful!");
        res.redirect("/scent/" + req.params.id);
      }
    } catch (err) {
      console.log(err);
    }
  },
  downvoteScent: async (req, res) => {
    try {
      const scent = await Scent.findById(req.params.id);
      if (scent.votes.includes(req.user.id)) {
        scent.votes.pull(req.user.id);
        scent.voteCount--;
        await scent.save();
        console.log("Downvote successful!");
        res.redirect("/scent/" + req.params.id);
      } else {
        console.log("You haven't upvoted this scent yet!");
        res.redirect("/scent/" + req.params.id);
      }
    } catch (err) {
      console.log(err);
    }
  },
  editScent: async (req, res) => {
    try {
      const scent = await Scent.findById(req.params.id);
      if (scent.user == req.user.id) {
        scent.title = req.body.title;
        scent.caption = req.body.caption;
        scent.isEdited = true;
        await scent.save();
        console.log("Scent has been edited!");
        res.redirect("/profile");
      } else {
        console.log("You can't edit this scent!");
        res.redirect("/profile");
      }
    } catch (err) {
      console.log(err);
    }
  },
  deleteScent: async (req, res) => {
    try {
      // Find scent by id
      let scent = await Scent.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(scent.cloudinaryId);
      // Delete scent from db
      await Scent.remove({ _id: req.params.id });
      console.log("Deleted Scent");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
