const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
  return mongoose.connect(`${process.env.URL}/cointab`);
};

module.exports = dbConnect;
