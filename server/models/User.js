const mongoose = require("mongoose");

const user = mongoose.Schema(
  {
    email: String,
    username: String,
    password: String,
    type: String,
    validated: Boolean,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", user);
