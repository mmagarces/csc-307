import mongoose from "mongoose";
import userModel from "../models/user.js";

mongoose.set("debug", true);

function getUsers(name, job) {
  let promise;
  if (name === undefined && job === undefined) {
    promise = userModel.find();
  } else if (name && !job) {
    promise = findUserByName(name);
  } else if (job && !name) {
    promise = findUserByJob(job);
  }
  else if (name && job) {
    //matches both name and job in this case
    promise = userModel.find({
      name: name,
      job: job,
    });
  }
  return promise;
}

function findUserById(id) {
  return userModel.findById(id);
}

function deleteUserById(id) {
  return userModel.findByIdAndDelete(id);
}

function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
}

function findUserByName(name) {
  return userModel.find({ name: name });
}

function findUserByJob(job) {
  return userModel.find({ job: job });
}


export default {
  addUser,
  getUsers,
  findUserById,
  deleteUserById,
  findUserByName,
  findUserByJob,
};