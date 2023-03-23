const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  experience: Number,
  phone: { type: String, unique: true },
  address: String,
  email: { type: String, unique: true },
  password: String,
  role: String,
  gender: String,
  status: String,
  cv: String,
  avatar: String,
});
userSchema.plugin(uniqueValidator);
const user = mongoose.model("User", userSchema);
module.exports = user;
