const cloudinary = require("../middleware/cloudinary");
const Comment = require("../models/Comment");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const comments = await Comment.find({ user: req.user.id });
      res.render("profile.ejs", { comments: comments, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getComment: async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);
      res.render("comment.ejs", { comment: comment, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createComment: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Comment.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        voteCount: 0,
        user: req.user.id,
      });
      console.log(`Comment has been added by ${req.user.userName}!`);
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  upvoteComment: async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);
      if (comment.votes.includes(req.user.id)) {
        console.log("You already upvoted this comment!");
        res.redirect("/comment/" + req.params.id);
      } else {
        comment.votes.push(req.user.id);
        comment.voteCount++;
        await comment.save();
        console.log("Upvote successful!");
        res.redirect("/comment/" + req.params.id);
      }
    } catch (err) {
      console.log(err);
    }
  },
  downvoteComment: async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);
      if (comment.votes.includes(req.user.id)) {
        comment.votes.pull(req.user.id);
        comment.voteCount--;
        await comment.save();
        console.log("Downvote successful!");
        res.redirect("/comment/" + req.params.id);
      } else {
        console.log("You haven't upvoted this comment yet!");
        res.redirect("/comment/" + req.params.id);
      }
    } catch (err) {
      console.log(err);
    }
  },
  editComment: async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);
      if (comment.user == req.user.id) {
        comment.title = req.body.title;
        comment.caption = req.body.caption;
        comment.isEdited = true;
        await comment.save();
        console.log("Comment has been edited!");
        res.redirect("/profile");
      } else {
        console.log("You can't edit this comment!");
        res.redirect("/profile");
      }
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      // Find comment by id
      let comment = await Comment.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(comment.cloudinaryId);
      // Delete comment from db
      await Comment.remove({ _id: req.params.id });
      console.log("Deleted Comment");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
