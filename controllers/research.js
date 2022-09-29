const cloudinary = require("../middleware/cloudinary");
const Research = require("../models/Research");
const Comment = require("../models/Comment");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const researchs = await Research.find({ user: req.user.id });
      res.render("profile.ejs", { researchs: researchs, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getResearch: async (req, res) => {
    try {
      const research = await Research.findById(req.params.id);
      res.render("research.ejs", { research: research, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createResearch: async (req, res) => {
    try {
      await Research.create({
        name: req.body.name,
        description: req.body.description,
        link: req.body.link,
        terps: [req.body.terps],
        users: req.body.users,
      });
      console.log("Research has been added!");
      res.redirect("/post/" + req.params.postId);
    } catch (err) {
      console.log(err);
    }
  },
  upvoteResearch: async (req, res) => {
    try {
      const research = await Research.findById(req.params.id);
      if (research.votes.includes(req.user.id)) {
        console.log("You already upvoted this research!");
        res.redirect("/research/" + req.params.id);
      } else {
        research.votes.push(req.user.id);
        research.voteCount++;
        await research.save();
        console.log("Upvote successful!");
        res.redirect("/research/" + req.params.id);
      }
    } catch (err) {
      console.log(err);
    }
  },
  downvoteResearch: async (req, res) => {
    try {
      const research = await Research.findById(req.params.id);
      if (research.votes.includes(req.user.id)) {
        research.votes.pull(req.user.id);
        research.voteCount--;
        await research.save();
        console.log("Downvote successful!");
        res.redirect("/research/" + req.params.id);
      } else {
        console.log("You haven't upvoted this research yet!");
        res.redirect("/research/" + req.params.id);
      }
    } catch (err) {
      console.log(err);
    }
  },
  editResearch: async (req, res) => {
    try {
      const research = await Research.findById(req.params.id);
      if (research.user == req.user.id) {
        research.title = req.body.title;
        research.caption = req.body.caption;
        research.isEdited = true;
        await research.save();
        console.log("Research has been edited!");
        res.redirect("/profile");
      } else {
        console.log("You can't edit this research!");
        res.redirect("/profile");
      }
    } catch (err) {
      console.log(err);
    }
  },
  deleteResearch: async (req, res) => {
    try {
      // Find research by id
      let research = await Research.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(research.cloudinaryId);
      // Delete research from db
      await Research.remove({ _id: req.params.id });
      console.log("Deleted Research");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
