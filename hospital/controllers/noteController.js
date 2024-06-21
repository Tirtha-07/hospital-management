const noteSchema = require("../models/noteModel"); // Assuming the model file is renamed
// const noteSignInSchema = require("../models/noteSignInModel");

// const mongoose = require("mongoose");
// const jwdtoken = require('jsonwebtoken'); // Import the jwt library
// const bcrypt = require('bcryptjs');
// const noteSignInCollection = require("../models/noteModel");
// const secretKey = "secret_key";

exports.insertNote = async (req, res) => {
  try {
    const newNote = await noteSchema.create(req.body);
    console.log("new note added", newNote);
    res.send({success: true,status:200,message:"user added successfully",data:newNote});
  } catch (err) {
    console.log("error", err);
    res.send(err.message);
  }
};

exports.getNote = async (req, res) => {
  const { NoteName } = req.query; // Assuming the query parameter is also renamed
  const queryObject = {};

  if (NoteName) {
    queryObject.NoteName = { $regex: NoteName, $options: "i" };
  }

  let apiData = noteSchema.find(queryObject);

  console.log(queryObject);
  const response = await apiData;
  console.log("response", response);
  res.json({ response });
};

exports.updateNote = async (req, res) => {
  const id = req.params.id;
  const data = await noteSchema.findByIdAndUpdate({ _id: id }, req.body, { new: true });
  res.send({ data });
};

exports.deleteNote = async (req, res) => {
  const id = req.params.id;
  const data = await noteSchema.deleteOne({ _id: id }, req.body, { new: true });
  res.send({ message: "deleted successfully", status: 200 });
};
