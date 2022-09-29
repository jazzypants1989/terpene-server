const cloudinary = require("../middleware/cloudinary");
const Nature = require("../models/Nature");
const Comment = require("../models/Comment");
const User = require("../models/User");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const natures = await Nature.find({ user: req.user.id });
      res.render("profile.ejs", { natures: natures, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getNature: async (req, res) => {
    try {
      const nature = await Nature.findById(req.params.id);
      res.render("nature.ejs", { nature: nature, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createNature: async (req, res) => {
    try {
      await Nature.create({
        name: req.body.name,
        description: req.body.description,
        terps: [req.body.terps],
        users: req.body.users,
      });
      console.log("Natural Source has been added!");
      res.redirect("/post/" + req.params.postId);
    } catch (err) {
      console.log(err);
    }
  },

  updateUserPosts: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      console.log(user);
      user.posts.push(req.params.id);
      console.log(user.posts);
      await user.save();
      console.log("Post added to user's posts!", user);
      res.redirect("/nature/" + req.params.id);
    } catch (err) {
      console.log(err);
    }
  },

  upvoteNature: async (req, res) => {
    try {
      const nature = await Nature.findById(req.params.id);
      if (nature.votes.includes(req.user.id)) {
        console.log("You already upvoted this nature!");
        res.redirect("/nature/" + req.params.id);
      } else {
        nature.votes.push(req.user.id);
        nature.voteCount++;
        await nature.save();
        console.log("Upvote successful!");
        res.redirect("/nature/" + req.params.id);
      }
    } catch (err) {
      console.log(err);
    }
  },
  downvoteNature: async (req, res) => {
    try {
      const nature = await Nature.findById(req.params.id);
      if (nature.votes.includes(req.user.id)) {
        nature.votes.pull(req.user.id);
        nature.voteCount--;
        await nature.save();
        console.log("Downvote successful!");
        res.redirect("/nature/" + req.params.id);
      } else {
        console.log("You haven't upvoted this nature yet!");
        res.redirect("/nature/" + req.params.id);
      }
    } catch (err) {
      console.log(err);
    }
  },
  editNature: async (req, res) => {
    try {
      const nature = await Nature.findById(req.params.id);
      if (nature.user == req.user.id) {
        nature.title = req.body.title;
        nature.caption = req.body.caption;
        nature.isEdited = true;
        await nature.save();
        console.log("Nature has been edited!");
        res.redirect("/profile");
      } else {
        console.log("You can't edit this nature!");
        res.redirect("/profile");
      }
    } catch (err) {
      console.log(err);
    }
  },
  deleteNature: async (req, res) => {
    try {
      // Find nature by id
      let nature = await Nature.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(nature.cloudinaryId);
      // Delete nature from db
      await Nature.remove({ _id: req.params.id });
      console.log("Deleted Nature");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
