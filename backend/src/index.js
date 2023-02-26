const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/db");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const userRouter = require("./route/userRoute");
require("dotenv").config();

const PORT = process.env.PORT || 8000;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("Welcome to cointab");
});

app.listen(PORT, async () => {
  await dbConnect();
  console.log(`Server is running on port ${PORT}`);
});
