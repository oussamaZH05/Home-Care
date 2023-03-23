const mongoose = require("mongoose");

const clientPostSchema = mongoose.Schema({
  title: String,
  description: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: String,
  date: String,
  nurseId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const clientPost = mongoose.model("ClientPost", clientPostSchema);
module.exports = clientPost;
