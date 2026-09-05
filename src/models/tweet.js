const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    max: [250, "tweet cannot be more than 250 char"]
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Like"
  }],
  image: {
    type: String
  }
 
}, { timestamps: true });

const Tweet = mongoose.model("Tweet", tweetSchema);
module.exports = Tweet;