const express = require("express")

// created instance of express
const app = express();

app.get("/", (req, res) => {
  res.send("hello world from express using nodemon")
});

app.get("/products", (req, res) => {
  res.status(200).send("products data")
})

app.post("/", (req, res) => {
  res.send("hello from post method")
});

app.listen("3000", () => {
  console.log("server started");
})