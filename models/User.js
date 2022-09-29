const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  userName: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  avatar: String,
  cloudinaryId: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: { type: Date, default: Date.now },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "postModel",
    },
  ],
  postModel: {
    type: String,
    enum: [
      "Terp",
      "Scent",
      "Benefit",
      "Nature",
      "Effect",
      "Strain",
      "Research",
    ],
  },
  edits: [
    {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "editModel",
      default: [],
    },
  ],
  editModel: {
    type: String,
    enum: [
      "Terp",
      "Scent",
      "Benefit",
      "Nature",
      "Effect",
      "Strain",
      "Research",
    ],
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: [],
    },
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "likeModel",
      default: [],
    },
  ],
  likeModel: {
    type: String,
    enum: [
      "Terp",
      "Scent",
      "Benefit",
      "Nature",
      "Effect",
      "Strain",
      "Research",
      "Comment",
    ],
  },
});

// Password hash middleware.

UserSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

// Helper method for validating user's password.

UserSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  cb
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
