const express = require("express");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 4000;

const router = require("./router");

app.use(express.json(), router);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
