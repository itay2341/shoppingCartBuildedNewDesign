const express = require("express");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(express.static(__dirname + "/frontend/browser"));
app.use(express.json());


app.get("/products", (req, res) => {
  let jsonData = {};
  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }
    try {
      jsonData = JSON.parse(data);
    }
    catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.status(200).json(jsonData);
  });
});

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/frontend/browser/index.html");
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
