const mongoose = require("mongoose");

const Task = mongoose.model(
  "task",
  new mongoose.Schema({
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  })
);

module.exports = { Task };
