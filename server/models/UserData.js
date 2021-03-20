const mongoose = require("mongoose");

const userData = mongoose.Schema(
  {
    email: String,
    name: String,
    shopName: String,
    address: String,
    phone: String,
    gender: String,
    shopType: String,
    country: String,
    state: String,
    locality: String,
    file: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("userDatas", userData);
