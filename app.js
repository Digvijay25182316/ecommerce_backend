const express = require("express");
const app = express();
const path = require("path");

// Middlewares
app.use(express.json());

// Serve static files from the 'build' directory
app.use(express.static(path.resolve(__dirname, "build")));

// Serve the 'index.html' for all routes
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

module.exports = app;
