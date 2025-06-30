const express = require("express");
const router = express.Router();
const controller = require("../controllers/setorController.js")
const { admin, vigia } = require("../middlewares/permissaoMiddleware.js");
const bodyParser = require("body-parser");
const token = require("../middlewares/tokenMiddleware.js");
require("dotenv").config();

router.use(bodyParser.json());

router.post("/create",controller.createController)




module.exports = router