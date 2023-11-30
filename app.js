const express = require("express");
const path = require("path");
const getLanding = require("./Views/Components/Landing");

const app = express();

//middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//get routes
app.get("/", async (req, res) => {
  try {
    const responseFile = await getLanding();
    if (responseFile) return res.sendFile(responseFile);
  } catch (error) {
    console.log(error);
  }
});
//static page middleware
app.use(express.static(path.resolve(__dirname, "Views", "public")));

module.exports = app;
