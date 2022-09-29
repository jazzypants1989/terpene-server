const cloudinary = require("cloudinary");
const Benefit = require("../models/Benefit");
const Comment = require("../models/Comment");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const benefits = await Benefit.find({ user: req.user.id });
      res.render("profile.ejs", { benefits: benefits, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getBenefit: async (req, res) => {
    try {
      const benefit = await Benefit.findById(req.params.id);
      res.render("benefit.ejs", { benefit: benefit, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createBenefit: async (req, res) => {
    try {
      await Benefit.create({
        name: req.body.name,
        description: req.body.description,
        terps: [req.body.terps],
        users: req.body.users,
      });
      console.log("Benefit has been added!");
      res.redirect("/post/" + req.params.postId);
    } catch (err) {
      console.log(err);
    }
  },
  upvoteBenefit: async (req, res) => {
    try {
      const benefit = await Benefit.findById(req.params.id);
      if (benefit.votes.includes(req.user.id)) {
        console.log("You already upvoted this benefit!");
        res.redirect("/benefit/" + req.params.id);
      } else {
        benefit.votes.push(req.user.id);
        benefit.voteCount++;
        await benefit.save();
        console.log("Upvote successful!");
        res.redirect("/benefit/" + req.params.id);
      }
    } catch (err) {
      console.log(err);
    }
  },
  downvoteBenefit: async (req, res) => {
    try {
      const benefit = await Benefit.findById(req.params.id);
      if (benefit.votes.includes(req.user.id)) {
        benefit.votes.pull(req.user.id);
        benefit.voteCount--;
        await benefit.save();
        console.log("Downvote successful!");
        res.redirect("/benefit/" + req.params.id);
      } else {
        console.log("You haven't upvoted this benefit yet!");
        res.redirect("/benefit/" + req.params.id);
      }
    } catch (err) {
      console.log(err);
    }
  },
  editBenefit: async (req, res) => {
    try {
      const benefit = await Benefit.findById(req.params.id);
      if (benefit.user == req.user.id) {
        benefit.title = req.body.title;
        benefit.caption = req.body.caption;
        benefit.isEdited = true;
        await benefit.save();
        console.log("Benefit has been edited!");
        res.redirect("/profile");
      } else {
        console.log("You can't edit this benefit!");
        res.redirect("/profile");
      }
    } catch (err) {
      console.log(err);
    }
  },
  deleteBenefit: async (req, res) => {
    try {
      // Find benefit by id
      let benefit = await Benefit.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(benefit.cloudinaryId);
      // Delete benefit from db
      await Benefit.remove({ _id: req.params.id });
      console.log("Deleted Benefit");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
