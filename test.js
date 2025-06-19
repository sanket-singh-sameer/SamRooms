const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use("*", (req, res) => {
  res.status(404).send("Page not found");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});