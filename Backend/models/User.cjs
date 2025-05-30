const mongoose = require("mongoose");

const User = mongoose.model(
  "user",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    isadmin: {
      type: Boolean,
      default: false,
    },
  }),
  "users"
);

module.exports = { User };
