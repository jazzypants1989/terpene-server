const cloudinary = require("../middleware/cloudinary");
const Effect = require("../models/Effect");
const Comment = require("../models/Comment");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const effects = await Effect.find({ user: req.user.id });
      res.render("profile.ejs", { effects: effects, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getEffect: async (req, res) => {
    try {
      const effect = await Effect.findById(req.params.id);
      res.render("effect.ejs", { effect: effect, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createEffect: async (req, res) => {
    try {
      await Effect.create({
        name: req.body.name,
        description: req.body.description,
        terps: [req.body.terps],
        users: req.body.users,
      });
      console.log("Effect has been added!");
      res.redirect("/post/" + req.params.postId);
    } catch (err) {
      console.log(err);
    }
  },
  upvoteEffect: async (req, res) => {
    try {
      const effect = await Effect.findById(req.params.id);
      if (effect.votes.includes(req.user.id)) {
        console.log("You already upvoted this effect!");
        res.redirect("/effect/" + req.params.id);
      } else {
        effect.votes.push(req.user.id);
        effect.voteCount++;
        await effect.save();
        console.log("Upvote successful!");
        res.redirect("/effect/" + req.params.id);
      }
    } catch (err) {
      console.log(err);
    }
  },
  downvoteEffect: async (req, res) => {
    try {
      const effect = await Effect.findById(req.params.id);
      if (effect.votes.includes(req.user.id)) {
        effect.votes.pull(req.user.id);
        effect.voteCount--;
        await effect.save();
        console.log("Downvote successful!");
        res.redirect("/effect/" + req.params.id);
      } else {
        console.log("You haven't upvoted this effect yet!");
        res.redirect("/effect/" + req.params.id);
      }
    } catch (err) {
      console.log(err);
    }
  },
  editEffect: async (req, res) => {
    try {
      const effect = await Effect.findById(req.params.id);
      if (effect.user == req.user.id) {
        effect.title = req.body.title;
        effect.caption = req.body.caption;
        effect.isEdited = true;
        await effect.save();
        console.log("Effect has been edited!");
        res.redirect("/profile");
      } else {
        console.log("You can't edit this effect!");
        res.redirect("/profile");
      }
    } catch (err) {
      console.log(err);
    }
  },
  deleteEffect: async (req, res) => {
    try {
      // Find effect by id
      let effect = await Effect.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(effect.cloudinaryId);
      // Delete effect from db
      await Effect.remove({ _id: req.params.id });
      console.log("Deleted Effect");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
