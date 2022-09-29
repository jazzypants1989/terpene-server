const cloudinary = require("../middleware/cloudinary");
const Strain = require("../models/Strain");
const Comment = require("../models/Comment");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const strains = await Strain.find({ user: req.user.id });
      res.render("profile.ejs", { strains: strains, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getStrain: async (req, res) => {
    try {
      const strain = await Strain.findById(req.params.id);
      res.render("strain.ejs", { strain: strain, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createStrain: async (req, res) => {
    try {
      await Strain.create({
        name: req.body.name,
        description: req.body.description,
        terps: [req.body.terps],
        users: req.body.users,
      });
      console.log("Strain has been added!");
      res.redirect("/post/" + req.params.postId);
    } catch (err) {
      console.log(err);
    }
  },
  upvoteStrain: async (req, res) => {
    try {
      const strain = await Strain.findById(req.params.id);
      if (strain.votes.includes(req.user.id)) {
        console.log("You already upvoted this strain!");
        res.redirect("/strain/" + req.params.id);
      } else {
        strain.votes.push(req.user.id);
        strain.voteCount++;
        await strain.save();
        console.log("Upvote successful!");
        res.redirect("/strain/" + req.params.id);
      }
    } catch (err) {
      console.log(err);
    }
  },
  downvoteStrain: async (req, res) => {
    try {
      const strain = await Strain.findById(req.params.id);
      if (strain.votes.includes(req.user.id)) {
        strain.votes.pull(req.user.id);
        strain.voteCount--;
        await strain.save();
        console.log("Downvote successful!");
        res.redirect("/strain/" + req.params.id);
      } else {
        console.log("You haven't upvoted this strain yet!");
        res.redirect("/strain/" + req.params.id);
      }
    } catch (err) {
      console.log(err);
    }
  },
  editStrain: async (req, res) => {
    try {
      const strain = await Strain.findById(req.params.id);
      if (strain.user == req.user.id) {
        strain.title = req.body.title;
        strain.caption = req.body.caption;
        strain.isEdited = true;
        await strain.save();
        console.log("Strain has been edited!");
        res.redirect("/profile");
      } else {
        console.log("You can't edit this strain!");
        res.redirect("/profile");
      }
    } catch (err) {
      console.log(err);
    }
  },
  deleteStrain: async (req, res) => {
    try {
      // Find strain by id
      let strain = await Strain.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(strain.cloudinaryId);
      // Delete strain from db
      await Strain.remove({ _id: req.params.id });
      console.log("Deleted Strain");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
