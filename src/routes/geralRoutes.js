const express = require("express");
const router = express.Router();
const controller = require("../controllers/geralsController");
router.post("/createLog", controller.writeLogController);
router.post("/searchLog", controller.searchLogController);
router.post("/logData", controller.logDataController)
module.exports = router;
