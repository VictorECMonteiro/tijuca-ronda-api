//Imports
const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");
const { admin, vigia } = require("../middlewares/permissaoMiddleware");
const token = require("../middlewares/tokenMiddleware");
const bodyParser = require("body-parser");
const multer = require("multer")

require("dotenv").config();
const upload = multer({storage: multer.memoryStorage()});
//Configs
router.use(bodyParser.json());

router.post("/loginHandle", loginController.loginControllerHandle);
router.post(
  "/create",
  loginController.loginControllerHandleCreator
);
router.post("/defineProfilePicture", upload.any(),loginController.loginDefineProfilePicture)
router.get("/listUsers",loginController.loginControllerGetUsers);
router.post("/modify", loginController.loginControllerModify);
router.post("/modifyUserData", loginController.loginControllerUserDataModify)
router.post("/deactivate", loginController.loginControllerDeactivate);
router.post("/token", [token], loginController.verifyToken);

module.exports = router;
