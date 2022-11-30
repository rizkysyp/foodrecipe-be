const express = require("express");
const router = express.Router();
const userRouter = require("../routes/users");
const recipesRouter = require("./recipes");

router.use("/users", userRouter);
router.use("/recipes", recipesRouter);
module.exports = router;
