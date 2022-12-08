const express = require("express");
const router = express.Router();
const { recipesController } = require("../controller/recipes");
const upload2 = require("../middlewares/upload");
const upload = require("../middlewares/upload-video");

router.post("/", upload, recipesController.insert);
router.post("/comments", recipesController.addComents);
router.post("/save", recipesController.addBookmark);
router.put("/update/:id", upload2.single("photo"), recipesController.update);
router.delete("/delete/:id", recipesController.delete);
router.get("/detail/:id", recipesController.detail);
router.get("/user-recipes/:id", recipesController.recipeUSer);
router.get("/search", recipesController.sort);
module.exports = router;
