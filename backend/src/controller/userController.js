const axios = require("axios");
const userModel = require("../model/user");

// ##### fetch 100 user from the api ###########

const fetchUserFromapi = async () => {
  let res = await axios("https://randomuser.me/api/?results=100");
  return res.data.results;
};

// ############# add user to database ################

const addUser = async (req, res) => {
  try {
    let data = await fetchUserFromapi();
    const allUser = await userModel.insertMany(data);
    res.send({ status: "success", data: allUser });
  } catch (er) {
    res.status(403).send({ status: "error", msg: er.message });
  }
};

// ################# delete users from database ###########

const deleteAllUsers = async (req, res) => {
  try {
    const deletedUsers = await userModel.deleteMany();
    res.send({
      status: "success",
      msg: "user removed successfully",
      data: deleteAllUsers,
    });
  } catch (er) {
    res.status(403).send({ status: "error", msg: er.message });
  }
};

// ############ get all users from database ############

const getAllUsers = async (req, res) => {
  const { page = 1, limit = 10, q = "" } = req.query;
  console.log(req.query);
  let query = {};
  if (q == "female") {
    query = { gender: "female" };
  } else if (q == "male") {
    query = { gender: "male" };
  } else if (q == "lessthanthirty") {
    query = { "dob.age": { $lt: 30 } };
  } else if (q == "greterthanequaltothirty") {
    query = { "dob.age": { $gte: 50 } };
  } else if (q == "India") {
    query = { "location.country": "India" };
  } else if (q == "New Zealand") {
    query = { "location.country": "New Zealand" };
  } else if (q == "Iran") {
    query = { "location.country": "Iran" };
  }
  try {
    const totalUsers = await userModel.find(query).count();
    const filteredUser = await userModel
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit);
    res.status(200).send({
      status: "success",
      users_count: totalUsers,
      data: filteredUser,
    });
  } catch (er) {
    res.status(403).send({ status: "error", msg: er.message });
  }
};

module.exports = { addUser, deleteAllUsers, getAllUsers };
