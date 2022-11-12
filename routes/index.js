const express = require("express");
var router = express.Router();
const todoController = require("../controllers/index");

router.get('/', todoController.login);

module.exports = router;