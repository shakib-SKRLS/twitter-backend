const express = require("express");
const connectDB = require("./config/database");
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

  
});