const express = require("express");
const router = express.Router();
const { recipesController } = require("../controller/recipes");
const upload = require("../middlewares/upload");

router.post("/", upload.single("photo"), recipesController.insert);

module.exports = router;
