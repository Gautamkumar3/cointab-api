const express = require("express");
const {
  addUser,
  deleteAllUsers,
  getAllUsers,
} = require("../controller/userController");

const userRouter = express.Router();

userRouter.post("/", addUser);
userRouter.delete("/", deleteAllUsers);
userRouter.get("/", getAllUsers);

module.exports = userRouter;
