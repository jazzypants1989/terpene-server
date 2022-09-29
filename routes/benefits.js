const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const benefitsController = require("../controllers/benefits");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Benefit Routes - simplified for now
router.get("/:id", ensureAuth, benefitsController.getBenefit);

router.post(
  "/createBenefit",
  upload.single("file"),
  benefitsController.createBenefit
);

router.put("/upvote/:id", benefitsController.upvoteBenefit);

router.put("/downvote/:id", benefitsController.downvoteBenefit);

router.put("/edit/:id", benefitsController.editBenefit);

router.delete("/deleteBenefit/:id", benefitsController.deleteBenefit);

module.exports = router;
