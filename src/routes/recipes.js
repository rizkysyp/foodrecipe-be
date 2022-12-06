const express = require("express");
const router = express.Router();
const { recipesController } = require("../controller/recipes");
const upload = require("../middlewares/upload");

router.post("/", upload.single("photo"), recipesController.insert);
router.post("/comments", recipesController.addComents);
router.post("/save", recipesController.addBookmark);
router.put("/update/:id", upload.single("photo"), recipesController.update);
router.delete("/delete/:id", recipesController.delete);
router.get("/detail/:id", recipesController.detail);
router.get("/user-recipes/:id", recipesController.recipeUSer);
router.get("/search", recipesController.sort);
module.exports = router;
