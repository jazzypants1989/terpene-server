const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const strainsController = require("../controllers/strains");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Strain Routes - simplified for now
router.get("/:id", ensureAuth, strainsController.getStrain);

router.post(
  "/createStrain",
  upload.single("file"),
  strainsController.createStrain
);

router.put("/upvote/:id", strainsController.upvoteStrain);

router.put("/downvote/:id", strainsController.downvoteStrain);

router.put("/edit/:id", strainsController.editStrain);

router.delete("/deleteStrain/:id", strainsController.deleteStrain);

module.exports = router;
