const express = require("express");
const router = express.Router();
const controller = require("../controllers/geralsController");
router.post("/createLog", controller.writeLogController);
module.exports = router;
