const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const researchController = require("../controllers/research");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Research Routes - simplified for now
router.get("/:id", ensureAuth, researchController.getResearch);

router.post(researchController.createResearch);

router.put("/upvote/:id", researchController.upvoteResearch);

router.put("/downvote/:id", researchController.downvoteResearch);

router.put("/edit/:id", researchController.editResearch);

router.delete("/deleteResearch/:id", researchController.deleteResearch);

module.exports = router;
