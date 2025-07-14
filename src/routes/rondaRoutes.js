//Imports
const express = require("express");
const router = express.Router();
const rondaController = require("../controllers/rondaController.js");
const { admin, vigia } = require("../middlewares/permissaoMiddleware.js");
const token = require("../middlewares/tokenMiddleware.js");
const bodyParser = require("body-parser");
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() });





require("dotenv").config();
//Configs
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}))

router.get("/createAndReturn", rondaController.rondaCreateAndReturnController);

router.get("/listLocals", rondaController.rondaReturnLocalsController);

router.post("/begin", rondaController.rondaIniciarController);

router.post("/stop", upload.any(),rondaController.rondaStopController);

router.post("/search", rondaController.pesquisarRondaController);

router.post("/rondaSearch", rondaController.pesquisarRondaLogsController);

router.get("/findAll", rondaController.rondaFindAllController);

router.post("/desfazerRonda", rondaController.undoRonda)


module.exports = router;
