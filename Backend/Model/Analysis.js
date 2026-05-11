const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema({
  resumeName: String,
  score: Number,
  foundSkills: [String],
  missingSkills: [String],
  requiredSkills: [String],
  suggestions: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user:{
   type:mongoose.Schema.Types.ObjectId,
   ref:"user"
  },
});

module.exports = mongoose.model("Analysis", analysisSchema);