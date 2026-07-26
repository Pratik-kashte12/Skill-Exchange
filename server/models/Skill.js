const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    offeredBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ownerName: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Skill", skillSchema);
