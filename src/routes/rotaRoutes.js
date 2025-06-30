const express = require("express");
const router = express.Router();
const rotaController = require("../controllers/rotaController.js");
const { admin, vigia } = require("../middlewares/permissaoMiddleware.js");
const bodyParser = require("body-parser");
const token = require("../middlewares/tokenMiddleware.js");
require("dotenv").config();

router.use(bodyParser.json());

router.post("/create", rotaController.rotaCreateController);
router.post("/delete", rotaController.rotaDeleteController);
router.get("/list", rotaController.listController);
router.get("/listLocals", rotaController.listLocals)
//Catalogar no Swagger
router.post("/defUser", rotaController.defUserRota)

module.exports = router;
