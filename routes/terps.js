const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const terpsController = require("../controllers/terps");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Terp Routes - simplified for now
router.get("/:id", ensureAuth, terpsController.getTerp);

router.post("/createTerp", upload.single("file"), terpsController.createTerp);

router.put("/upvote/:id", terpsController.upvoteTerp);

router.put("/downvote/:id", terpsController.downvoteTerp);

router.put("/edit/:id", terpsController.editTerp);

router.delete("/deleteTerp/:id", terpsController.deleteTerp);

module.exports = router;
