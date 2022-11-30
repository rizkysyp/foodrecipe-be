const express = require("express");
const router = express.Router();
const { userController } = require("../controller/users");
const upload = require("../middlewares/upload");

router.post("/register", userController.insert);
router.get("/login", userController.login);
router.put("/:id", upload.single("photo"), userController.updatePhoto);
router.get("/:id", userController.getDetailUsers);
module.exports = router;
