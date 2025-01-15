//Imports
const express = require("express");
const router = express.Router();
const rondaController = require("../controllers/rondaController.js");
const { admin, vigia } = require("../middlewares/permissaoMiddleware.js");
const token = require("../middlewares/tokenMiddleware.js");
const bodyParser = require("body-parser");
require("dotenv").config();
//Configs
router.use(bodyParser.json());

router.get("/createAndReturn", rondaController.rondaCreateAndReturnController);

router.get("/listLocals", rondaController.rondaReturnLocalsController);

router.post("/begin", rondaController.rondaIniciarController);

router.post("/stop", rondaController.rondaStopController);

router.post("/search", rondaController.rondaSearchController);

module.exports = router;
