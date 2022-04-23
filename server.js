const express = require("express")
const bodyParser = require('body-parser');
const authRoute = require("./routes/auth.route");
const productsRoute = require("./routes/products.route");

// created instance of express
const app = express();

app.use(bodyParser.json())

app.use("/api/auth", authRoute);

app.use("/api/products", productsRoute);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if(err) {
    res.status(500).send({ error: "something went wrong..."})
  }
  next(err)
})

app.listen("3000", () => {
  console.log("server started");
})