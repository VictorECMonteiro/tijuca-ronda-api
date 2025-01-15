const express = require("express");
const router = express.Router();
const localsController = require("../controllers/localsController");

router.post("/create", localsController.localCreateController);
router.get("/list", localsController.listController);
router.post("/delete", localsController.deleteLocalController);

module.exports = router;
