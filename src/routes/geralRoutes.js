const express = require("express");
const router = express.Router();
const controller = require("../controllers/geralsController");
router.post("/createLog", controller.writeLogController);
router.post("/searchLog", controller.searchLogController);
router.post("/logData", controller.logDataController);
router.get("/resgatarDadosLog/:idRonda", controller.getDataLog)
module.exports = router;
