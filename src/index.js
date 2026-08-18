const express = require("express");
const connectDB = require("./config/database");
const app = express();
const port = 3000;
const Tweet = require("./models/tweet");
const routes = require("./routes/index");

app.use(express.json());
app.use('/api', routes);

app.listen(port, async() => {
  console.log(`Server is running on http://localhost:${port}`);
  await connectDB();
  console.log("Database connected");
  const tweet = await Tweet.create({
    content: "Hello, world!",
    userEmail: "a@c.com"
  });
  console.log("Tweet created:", tweet);
});