const express = require("express");
const router = express.Router();
const rotaController = require("../controllers/rotaController.js");
const { admin, vigia } = require("../middlewares/permissaoMiddleware.js");
const token = require("../middlewares/tokenMiddleware.js");
const bodyParser = require("body-parser");
require("dotenv").config();

router.use(bodyParser.json());

router.post("/create", rotaController.rotaCreateController);
router.post("/delete", rotaController.rotaDeleteController);
router.get("/list", rotaController.listController);

module.exports = router;
