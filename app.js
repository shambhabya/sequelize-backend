const express = require("express");
const bodyParser = require("body-parser");
const { connectDb } = require("./db");
const app = express();
require("dotenv").config();

app.use(bodyParser.json());

(async () => {
  await connectDb();

  console.log(`Attempting to run server on port ${process.env.PORT}`);

  app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
  });
})();
