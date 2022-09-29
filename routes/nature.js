const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const naturesController = require("../controllers/nature");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Nature Routes - simplified for now
router.get("/:id", ensureAuth, naturesController.getNature);

router.post(
  "/createNature",
  naturesController.createNature,
  naturesController.updateUserPosts
);

router.put("/upvote/:id", naturesController.upvoteNature);

router.put("/downvote/:id", naturesController.downvoteNature);

router.put("/edit/:id", naturesController.editNature);

router.delete("/deleteNature/:id", naturesController.deleteNature);

module.exports = router;
