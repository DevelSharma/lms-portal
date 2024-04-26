const express = require("express");
require("./db/dbconnect");
const controller = require("./controllers/login-signup-contorller");
const {
  verifyToken,
} = require("./utils/jwt_validation");

const router = express.Router();

router.post("/signup",  controller.signup, verifyToken);
router.post("/login", controller.login, verifyToken);


module.exports = router;
