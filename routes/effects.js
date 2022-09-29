const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const effectsController = require("../controllers/effects");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Effect Routes - simplified for now
router.get("/:id", ensureAuth, effectsController.getEffect);

router.post("/createEffect", effectsController.createEffect);

router.put("/upvote/:id", effectsController.upvoteEffect);

router.put("/downvote/:id", effectsController.downvoteEffect);

router.put("/edit/:id", effectsController.editEffect);

router.delete("/deleteEffect/:id", effectsController.deleteEffect);

module.exports = router;
