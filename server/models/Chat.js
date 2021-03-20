const mongoose = require("mongoose");

const chat = mongoose.Schema(
  {
    message: String,
    sender: String,
    receiver: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("chats", chat);
