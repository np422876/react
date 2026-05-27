const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const PORT = 8000;

const properties = require("./data/properties.json");

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/api/properties", (req, res) => {
  res.json(properties);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});