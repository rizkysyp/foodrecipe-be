const express = require("express");
const router = express.Router();
const { userController } = require("../controller/users");
const { user } = require("../middlewares/user");

const upload = require("../middlewares/upload-video");

router.post("/register", userController.insert);
router.post("/login", userController.login);
router.put("/", user, upload, userController.updatePhoto);
router.get("/", user, userController.getDetailUsers);
router.post("/verif", userController.auth);
module.exports = router;
