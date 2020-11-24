require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const server = express();

// Middleware Plugins
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

// Routes
server.use("/", [require("./routes")]);

// Start the server
server.listen(process.env.PORT, (error) => {
  if (error) {
    console.error("Error starting", error);
  } else {
    console.info(`Listening on port ${process.env.PORT}`);
  }
});
