const mongoose = require("mongoose");

const clientRequestsSchema = mongoose.Schema({
  nurseId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: String,
  date: String,
});

const clientRequests = mongoose.model("clientRequests", clientRequestsSchema);
module.exports = clientRequests;
