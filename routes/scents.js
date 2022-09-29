const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const scentsController = require("../controllers/scents");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Scent Routes - simplified for now
router.get("/:id", ensureAuth, scentsController.getScent);

router.post("/createScent", scentsController.createScent);

router.put("/upvote/:id", scentsController.upvoteScent);

router.put("/downvote/:id", scentsController.downvoteScent);

router.put("/edit/:id", scentsController.editScent);

router.delete("/deleteScent/:id", scentsController.deleteScent);

module.exports = router;
