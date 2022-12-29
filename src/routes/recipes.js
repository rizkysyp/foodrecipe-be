const express = require("express");
const router = express.Router();
const { recipesController } = require("../controller/recipes");
const upload2 = require("../middlewares/upload");
const upload = require("../middlewares/upload-video");
const { user } = require("../middlewares/user");

router.post("/", upload, user, recipesController.insert);
router.post("/comments", recipesController.addComents);
router.post("/save/", user, recipesController.addBookmark);
router.put("/update/:id", upload, recipesController.update);
router.delete("/delete/:id", recipesController.delete);
router.get("/detail/:id", recipesController.detail);
router.get("/user-recipes/", user, recipesController.recipeUSer);
router.get("/search", recipesController.sort);
router.get("/bookmark", user, recipesController.getBookmark);
module.exports = router;
