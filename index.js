const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(express.static(path.join(__dirname, "../build")));

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server listen to ${process.env.PORT}`);
});
module.exports = {
  server,
};
