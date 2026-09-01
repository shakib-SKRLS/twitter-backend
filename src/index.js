const express = require("express");
const connectDB = require("./config/database");
const UserRepository = require("./repository/user-repository");
const TweetRepository = require("./repository/tweet-repository");
const LikeService = require("./services/like-service");
const app = express();
const port = 3000;
const routes = require("./routes/index");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', routes);

app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
  await connectDB();
  console.log("Database connected");

  const tweetRepo =  TweetRepository;
  const userRepo =  UserRepository;

  const tweets = await tweetRepo.getAll(0, 5);
  console.log("Tweets fetched:", tweets);

  if (tweets.length === 0) {
    console.log("No tweets found to like");
    return;
  }

  let user = await userRepo.findByEmail("d@gmail.com");
  if (!user) {
    user = await userRepo.create({
      name: "Shakib Khan",
      email: "e@gmail.com",
      password: "123456"
    });
    console.log("User created:", user);
  } else {
    console.log("User found:", user);
  }

  const likeService = new LikeService();
  const isAdded = await likeService.toggleLike(tweets[1]._id, "Tweet", user._id);
  console.log("Like toggled, isAdded:", isAdded);
});